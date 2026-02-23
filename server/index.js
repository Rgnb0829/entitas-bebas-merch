const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4173',
        process.env.FRONTEND_URL,
        /\.vercel\.app$/,
    ].filter(Boolean),
    credentials: true,
}));

app.use(express.json());


// Serve static files from 'uploads' directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const financeRoutes = require('./routes/finance');
const discountRoutes = require('./routes/discounts');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/discounts', discountRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Entitas Bebas Backend Running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
