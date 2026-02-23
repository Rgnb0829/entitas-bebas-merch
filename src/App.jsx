import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import ProductManager from './pages/admin/ProductManager';
import VariantManager from './pages/admin/VariantManager';
import DiscountManager from './pages/admin/DiscountManager';
import FinanceManager from './pages/admin/FinanceManager';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="variants" element={<VariantManager />} />
            <Route path="discounts" element={<DiscountManager />} />
            <Route path="finance" element={<FinanceManager />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;