const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET all products with images
router.get('/', (req, res) => {
    const productsQuery = "SELECT * FROM products ORDER BY createdAt DESC";
    const imagesQuery = "SELECT * FROM product_images WHERE isActive = 1 ORDER BY id ASC"; // Only active images for public
    const variantsQuery = "SELECT * FROM product_variants ORDER BY id ASC";

    db.all(productsQuery, [], (err, products) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(imagesQuery, [], (err, images) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all(variantsQuery, [], (err, variants) => {
                if (err) return res.status(500).json({ error: err.message });

                const productsWithDetails = products.map(product => {
                    const productImages = images.filter(img => img.product_id === product.id);
                    const productVariants = variants.filter(v => v.product_id === product.id);

                    return {
                        ...product,
                        images: productImages.length > 0 ? productImages : [],
                        variants: productVariants
                    };
                });

                res.json(productsWithDetails);
            });
        });
    });
});

// POST new product with multiple images
router.post('/', upload.array('images', 5), (req, res) => {
    console.log('POST /api/products received');
    const { code, name, price, tag, imageLabels } = req.body; // imageLabels sent as JSON string array

    if (!code || !name || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Use first image as main imageUrl for backward compatibility
    const mainImageUrl = req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null;

    const sql = "INSERT INTO products (code, name, price, tag, imageUrl) VALUES (?, ?, ?, ?, ?)";
    const params = [code, name, price, tag, mainImageUrl];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const productId = this.lastID;

        // Process images if any
        if (req.files && req.files.length > 0) {
            let labels = [];
            try {
                labels = imageLabels ? JSON.parse(imageLabels) : [];
            } catch (e) {
                console.error("Error parsing image labels", e);
            }

            const imagePromises = req.files.map((file, index) => {
                return new Promise((resolve, reject) => {
                    const label = labels[index] || (index === 0 ? 'Front' : 'Back');
                    const imgUrl = `/uploads/${file.filename}`;
                    db.run(
                        "INSERT INTO product_images (product_id, imageUrl, label) VALUES (?, ?, ?)",
                        [productId, imgUrl, label],
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            });

            Promise.all(imagePromises)
                .then(() => {
                    res.status(201).json({ id: productId, message: "Product created with images" });
                })
                .catch(err => {
                    console.error("Error saving images", err);
                    res.status(201).json({ id: productId, message: "Product created but some images failed" });
                });
        } else {
            res.status(201).json({ id: productId, message: "Product created" });
        }
    });
});

// GET all images for a product (Admin use)
router.get('/:id/images', (req, res) => {
    db.all("SELECT * FROM product_images WHERE product_id = ?", [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// PUT update image status (toggle active)
router.put('/images/:id', (req, res) => {
    const { isActive } = req.body;
    db.run("UPDATE product_images SET isActive = ? WHERE id = ?", [isActive ? 1 : 0, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Image updated" });
    });
});

// DELETE image
router.delete('/images/:id', (req, res) => {
    db.run("DELETE FROM product_images WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Image deleted" });
    });
});

// DELETE product
router.delete('/:id', (req, res) => {
    // Cascade delete handles product_images and product_variants
    const sql = "DELETE FROM products WHERE id = ?";
    db.run(sql, req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Product not found" });

        res.json({ message: "Product deleted", id: req.params.id });
    });
});

// --- VARIANT ROUTES ---

// GET variants for a product
router.get('/:id/variants', (req, res) => {
    db.all("SELECT * FROM product_variants WHERE product_id = ?", [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST new variant
router.post('/:id/variants', (req, res) => {
    const { color, size, stock, price_adjustment } = req.body;
    const sql = "INSERT INTO product_variants (product_id, color, size, stock, price_adjustment) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [req.params.id, color, size, stock || 0, price_adjustment || 0], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, product_id: req.params.id, color, size, stock, price_adjustment });
    });
});

// PUT update variant
router.put('/variants/:variantId', (req, res) => {
    const { color, size, stock, price_adjustment } = req.body;
    const sql = "UPDATE product_variants SET color = ?, size = ?, stock = ?, price_adjustment = ? WHERE id = ?";
    db.run(sql, [color, size, stock, price_adjustment, req.params.variantId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Variant updated" });
    });
});

// DELETE variant
router.delete('/variants/:variantId', (req, res) => {
    db.run("DELETE FROM product_variants WHERE id = ?", [req.params.variantId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Variant deleted" });
    });
});

module.exports = router;
