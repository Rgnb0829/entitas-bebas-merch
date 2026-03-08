const express = require('express');
const router = express.Router();
const db = require('../database');
const jwt = require('jsonwebtoken');

// Middleware to verify admin token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: "No token provided" });

    const SECRET_KEY = 'entitas_bebas_merch_secret_key_change_in_prod';
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// @route   POST /api/messages
// @desc    Submit a new contact message (Public)
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Semua form (Nama, Email, Pesan) wajib diisi." });
    }

    const query = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Gagal mengirim pesan." });
        }
        res.status(201).json({ message: "Transmisi berhasil dikirim.", id: this.lastID });
    });
});

// @route   GET /api/messages
// @desc    Get all messages (Admin Only)
router.get('/', verifyToken, (req, res) => {
    db.all("SELECT * FROM messages ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read (Admin Only)
router.put('/:id/read', verifyToken, (req, res) => {
    const { id } = req.params;
    db.run("UPDATE messages SET status = 'read' WHERE id = ?", [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Gagal memperbarui status pesan." });
        }
        res.json({ message: "Pesan telah dibaca." });
    });
});

module.exports = router;
