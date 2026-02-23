const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();
const SECRET_KEY = 'entitas_bebas_merch_secret_key_change_in_prod'; // In a real app, use environment variable

// Seed an initial admin if not exists (for development purpose)
const seedAdmin = () => {
    const username = 'admin';
    const password = 'password123';

    db.get("SELECT * FROM admins WHERE username = ?", [username], (err, row) => {
        if (err) return console.error(err.message);
        if (!row) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return console.error(err);
                db.run("INSERT INTO admins (username, password_hash) VALUES (?, ?)", [username, hash], (err) => {
                    if (err) console.error(err);
                    else console.log("Default admin created: admin / password123");
                });
            });
        }
    });
};

seedAdmin();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM admins WHERE username = ?", [username], (err, user) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) return res.status(500).json({ error: "Server error" });
            if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ token, username: user.username });
        });
    });
});

module.exports = router;
