const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const path = require('path');

const PORT = 3000;

const serverOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}

const app = express();

app.use(helmet());

app.get('/', (_ ,res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/secret', (_, res) => {
    return res.send('Your personal secret is 401');
});

https.createServer(serverOptions, app)
    .listen(PORT, () => {
        console.log(`Listening on port https://localhost:${PORT}...`); 
    });