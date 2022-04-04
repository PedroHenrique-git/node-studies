const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir('./uploads', (err) => {
            if(err) {
                console.log('ERR --> ', err.stack);
            } else {
                callback(null, './uploads');
            }
        });
    },
    fileName: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/api/file', (req, res) => {
    const upload = multer({ 
        storage,
        fileFilter: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            const allowedFormats = ['.png', '.jpg', '.gif', '.jpeg'];
            if(!allowedFormats.includes(ext)) {
                return callback(new Error('Only images are allowed'));
            }
            callback(null, true);
        }
    }).single('userFile');
    upload(req, res, (err) => {
        if(err) {
            return res.end('Error uploading file');
        }
        res.end("File is uploaded");
    })
});

app.listen(3000, () => console.log("working on http://localhost:3000"));