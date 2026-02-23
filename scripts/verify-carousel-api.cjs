const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api/products';

// Create a dummy image file for testing
const createDummyImage = (filename) => {
    const filePath = path.join(__dirname, filename);
    fs.writeFileSync(filePath, 'dummy content');
    return filePath;
};

const verifyCarousel = async () => {
    try {
        console.log('--- Starting Verification ---');

        const img1 = createDummyImage('test_front.png');
        const img2 = createDummyImage('test_back.png');

        // 1. Create Product with 2 images
        console.log('1. Creating product with 2 images...');
        const form = new FormData();
        form.append('code', 'TEST-CAROUSEL-' + Date.now());
        form.append('name', 'Test Carousel T-Shirt');
        form.append('price', '150');
        form.append('tag', 'Test');
        form.append('imageLabels', JSON.stringify(['Front View', 'Back View']));
        form.append('images', fs.createReadStream(img1));
        form.append('images', fs.createReadStream(img2));

        const createRes = await axios.post(BASE_URL, form, {
            headers: { ...form.getHeaders() }
        });
        console.log('   Product Created. ID:', createRes.data.id);
        const productId = createRes.data.id;

        // 2. Fetch Product and check images
        console.log('2. Fetching products to verify images...');
        const fetchRes = await axios.get(BASE_URL);
        const product = fetchRes.data.find(p => p.id === productId);

        if (!product) throw new Error('Product not found in list');
        console.log('   Product found.');

        if (!product.images || product.images.length !== 2) {
            console.error('   FAILED: Expected 2 images, found', product.images ? product.images.length : 0);
            console.log('   Images:', product.images);
        } else {
            console.log('   SUCCESS: 2 images found.');
            console.log('   Image 1 Label:', product.images[0].label);
            console.log('   Image 2 Label:', product.images[1].label);
        }

        // 3. Toggle Image Status (PUT)
        console.log('3. Toggling active status of first image...');
        const imageId = product.images[0].id;
        await axios.put(`${BASE_URL}/images/${imageId}`, { isActive: false });
        console.log('   Status toggled.');

        // 4. Verify toggle (Fetch again)
        console.log('4. Verifying toggle...');
        const fetchRes2 = await axios.get(BASE_URL);
        const product2 = fetchRes2.data.find(p => p.id === productId);
        // Note: Public GET /api/products only returns active images.
        // So we expect 1 image now.
        if (product2.images.length === 1) {
            console.log('   SUCCESS: Only 1 active image returned (as expected for public API).');
        } else {
            console.error('   FAILED: Expected 1 active image, found', product2.images.length);
        }

        // Cleanup
        fs.unlinkSync(img1);
        fs.unlinkSync(img2);
        console.log('--- Verification Complete ---');

    } catch (err) {
        console.error('ERROR:', err.message);
        if (err.response) console.error('Response:', err.response.data);
    }
};

verifyCarousel();
