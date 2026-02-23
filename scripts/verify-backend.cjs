const http = require('http');

function postRequest(path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body }));
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

function getRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body }));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function verify() {
    try {
        console.log('Verifying API...');
        const health = await getRequest('/api');
        console.log('Health Check:', health.statusCode, health.body);

        const loginData = JSON.stringify({ username: 'admin', password: 'password123' });
        const login = await postRequest('/api/auth/login', loginData);
        console.log('Login Check:', login.statusCode);

        if (login.statusCode === 200) {
            const token = JSON.parse(login.body).token;
            console.log('Token received:', token ? 'YES' : 'NO');
        } else {
            console.log('Login Body:', login.body);
        }

    } catch (err) {
        console.error('Verification failed:', err.message);
    }
}

verify();
