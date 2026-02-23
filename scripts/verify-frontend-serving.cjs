const axios = require('axios');

const URL = 'http://localhost:5173';

const verifyFrontend = async () => {
    try {
        console.log(`Checking Frontend at ${URL}...`);
        const res = await axios.get(URL);
        if (res.status === 200 && res.data.includes('Entitas Bebas Merch')) {
            console.log('SUCCESS: Frontend is running and serving the app.');
        } else if (res.status === 200) {
            console.log('WARNING: Frontend is running but did not find expected title. Content snippet:');
            console.log(res.data.substring(0, 200));
        } else {
            console.error('FAILED: Frontend returned status', res.status);
        }
    } catch (err) {
        console.error('FAILED: Could not connect to frontend.', err.message);
    }
};

verifyFrontend();
