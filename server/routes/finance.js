const express = require('express');
const db = require('../database');
const router = express.Router();

// --- VENDORS ---


router.get('/vendors', (req, res) => {
    db.all("SELECT * FROM vendors", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/vendors', (req, res) => {
    const { name, contact_info } = req.body;
    db.run("INSERT INTO vendors (name, contact_info) VALUES (?, ?)", [name, contact_info], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, contact_info });
    });
});

router.put('/vendors/:id', (req, res) => {
    const { name, contact_info } = req.body;
    db.run("UPDATE vendors SET name = ?, contact_info = ? WHERE id = ?", [name, contact_info, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Vendor updated" });
    });
});

router.delete('/vendors/:id', (req, res) => {
    db.run("DELETE FROM vendors WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Vendor deleted" });
    });
});

// --- TAXES ---

router.get('/taxes', (req, res) => {
    db.all("SELECT * FROM taxes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.put('/taxes/:id', (req, res) => {
    const { rate, description } = req.body;
    db.run("UPDATE taxes SET rate = ?, description = ? WHERE id = ?", [rate, description, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tax updated" });
    });
});

// --- HPP CALCULATIONS ---

router.get('/hpp', (req, res) => {
    const sql = `
        SELECT h.*, p.name as product_name, v.name as vendor_name 
        FROM hpp_calculations h
        JOIN products p ON h.product_id = p.id
        LEFT JOIN vendors v ON h.vendor_id = v.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/hpp/:productId', (req, res) => {
    db.get("SELECT * FROM hpp_calculations WHERE product_id = ?", [req.params.productId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || {});
    });
});

router.post('/hpp', (req, res) => {
    const { product_id, vendor_id, material_cost, labor_cost, overhead_cost } = req.body;
    const calculated_hpp = Number(material_cost) + Number(labor_cost) + Number(overhead_cost);

    db.run(
        "INSERT INTO hpp_calculations (product_id, vendor_id, material_cost, labor_cost, overhead_cost, calculated_hpp) VALUES (?, ?, ?, ?, ?, ?)",
        [product_id, vendor_id, material_cost, labor_cost, overhead_cost, calculated_hpp],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, calculated_hpp });
        }
    );
});

router.put('/hpp/:id', (req, res) => {
    const { vendor_id, material_cost, labor_cost, overhead_cost } = req.body;
    const calculated_hpp = Number(material_cost) + Number(labor_cost) + Number(overhead_cost);

    db.run(
        "UPDATE hpp_calculations SET vendor_id = ?, material_cost = ?, labor_cost = ?, overhead_cost = ?, calculated_hpp = ? WHERE id = ?",
        [vendor_id, material_cost, labor_cost, overhead_cost, calculated_hpp, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "HPP updated", calculated_hpp });
        }
    );
});

module.exports = router;
