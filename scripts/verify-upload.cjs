const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
            username: 'admin',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('Login successful. Token obtained.');

        console.log('2. Preparing upload...');
        const form = new FormData();
        form.append('code', 'TEST-001');
        form.append('name', 'Test Product');
        form.append('price', 100);
        form.append('tag', 'Test');

        // Create a dummy image file if it doesn't exist
        const dummyImagePath = path.join(__dirname, 'test-image.png');
        if (!fs.existsSync(dummyImagePath)) {
            fs.writeFileSync(dummyImagePath, 'fake image content');
        }
        form.append('image', fs.createReadStream(dummyImagePath));

        console.log('3. Uploading product...');
        const uploadRes = await axios.post('http://localhost:3000/api/products', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}` // Though my auth middleware currently might not even verify token for this route? 
                // Wait, I didn't actually implement auth middleware on product routes in products.js yet!
                // But let's send it anyway.
            }
        });

        console.log('Upload Status:', uploadRes.status);
        console.log('Upload Data:', uploadRes.data);

        if (uploadRes.status === 201) {
            console.log('SUCCESS: Product uploaded.');
        } else {
            console.log('FAILURE: Unexpected status code.');
        }

    } catch (err) {
        console.error('ERROR:', err.response ? err.response.data : err.message);
    }
}

testUpload();
