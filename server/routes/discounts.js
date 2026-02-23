const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
    db.all("SELECT * FROM discounts", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { name, type, value, start_date, end_date } = req.body;
    db.run(
        "INSERT INTO discounts (name, type, value, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
        [name, type, value, start_date, end_date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name });
        }
    );
});

router.put('/:id', (req, res) => {
    const { name, type, value, start_date, end_date, is_active } = req.body;
    db.run(
        "UPDATE discounts SET name = ?, type = ?, value = ?, start_date = ?, end_date = ?, is_active = ? WHERE id = ?",
        [name, type, value, start_date, end_date, is_active, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Discount updated" });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.run("DELETE FROM discounts WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Discount deleted" });
    });
});

module.exports = router;
