const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const verify = async () => {
    try {
        console.log('--- Starting Advanced Commerce Verification ---');

        // 1. Finance: Create Vendor
        console.log('1. Creating Vendor...');
        const vendorRes = await axios.post(`${BASE_URL}/finance/vendors`, {
            name: 'Test Vendor ' + Date.now(),
            contact_info: 'test@vendor.com'
        });
        console.log('   Vendor Created:', vendorRes.data.id);
        const vendorId = vendorRes.data.id;

        // 2. Finance: Taxes (Update Default)
        console.log('2. Updating Taxes...');
        const taxesRes = await axios.get(`${BASE_URL}/finance/taxes`);
        if (taxesRes.data.length > 0) {
            const taxId = taxesRes.data[0].id;
            await axios.put(`${BASE_URL}/finance/taxes/${taxId}`, {
                rate: 12.0,
                description: 'Updated Tax Rate'
            });
            console.log('   Tax Updated.');
        } else {
            console.warn('   No taxes found to update.');
        }

        // 3. Discounts: Create Discount
        console.log('3. Creating Discount...');
        const discountRes = await axios.post(`${BASE_URL}/discounts`, {
            name: 'TEST_PROMO',
            type: 'percentage',
            value: 10,
            start_date: '2025-01-01',
            end_date: '2025-12-31'
        });
        console.log('   Discount Created:', discountRes.data.id);

        // 4. Products: Create Variant
        console.log('4. Creating Variant...');
        // First get a product
        const productsRes = await axios.get(`${BASE_URL}/products`);
        if (productsRes.data.length > 0) {
            const product = productsRes.data[0];
            const variantRes = await axios.post(`${BASE_URL}/products/${product.id}/variants`, {
                color: 'Neon Blue',
                size: 'XL',
                stock: 100,
                price_adjustment: 50
            });
            console.log('   Variant Created:', variantRes.data.id);
        } else {
            console.warn('   No products found to add variant to.');
        }

        console.log('--- Verification Complete: SUCCESS ---');

    } catch (err) {
        console.error('ERROR:', err.message);
        if (err.response) console.error('Response:', err.response.data);
    }
};

verify();
