const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    // Admins table
    db.run(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT
    )`);

    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      name TEXT,
      price INTEGER,
      tag TEXT,
      imageUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Product Images table (for variants/carousel)
    db.run(`CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      imageUrl TEXT,
      label TEXT DEFAULT 'Front',
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
    )`);

    // Variants Table (Size/Color)
    db.run(`CREATE TABLE IF NOT EXISTS product_variants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            color TEXT,
            size TEXT,
            stock INTEGER DEFAULT 0,
            price_adjustment INTEGER DEFAULT 0,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        )`);

    // Discounts Table
    db.run(`CREATE TABLE IF NOT EXISTS discounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT CHECK(type IN ('percentage', 'fixed')),
            value INTEGER,
            start_date DATETIME,
            end_date DATETIME,
            is_active BOOLEAN DEFAULT 1
        )`);

    // Vendors (Suppliers) Table
    db.run(`CREATE TABLE IF NOT EXISTS vendors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            contact_info TEXT
        )`);

    // HPP (COGS) Calculations
    db.run(`CREATE TABLE IF NOT EXISTS hpp_calculations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            vendor_id INTEGER,
            material_cost INTEGER DEFAULT 0,
            labor_cost INTEGER DEFAULT 0,
            overhead_cost INTEGER DEFAULT 0,
            calculated_hpp INTEGER DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY(vendor_id) REFERENCES vendors(id) ON DELETE SET NULL
        )`);

    // Taxes Table
    db.run(`CREATE TABLE IF NOT EXISTS taxes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT UNIQUE, -- e.g., 'PPN', 'PPh'
            rate REAL, -- e.g., 0.11 for 11%
            description TEXT
        )`);

    // Seed Default Taxes if empty
    db.get("SELECT count(*) as count FROM taxes", [], (err, row) => {
      if (!err && row.count === 0) {
        db.run("INSERT INTO taxes (type, rate, description) VALUES (?, ?, ?)", ['PPN', 11.0, 'Pajak Pertambahan Nilai (11%)']);
        db.run("INSERT INTO taxes (type, rate, description) VALUES (?, ?, ?)", ['PPh', 0.5, 'Pajak Penghasilan Final UMKM (0.5%)']);
      }
    });

    // Seed Default Admin if empty
    db.get("SELECT count(*) as count FROM admins", [], (err, row) => {
      if (!err && row.count === 0) {
        const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hash = bcrypt.hashSync(defaultPassword, 10);
        db.run("INSERT INTO admins (username, password_hash) VALUES (?, ?)", ['admin', hash], (err) => {
          if (!err) console.log('Default admin created: username=admin');
        });
      }
    });
  });
}

module.exports = db;
