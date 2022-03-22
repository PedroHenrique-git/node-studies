const express = require('express');

const APP_PORT = 3000;
const app = express();

app.get('/', (_, resp) => {
    resp.send('Hello world');
});

app.listen(APP_PORT, () => {
    console.log(`Server listening on http://localhost:${APP_PORT}`);
});
