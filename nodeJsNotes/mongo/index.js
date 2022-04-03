const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());

const User = new Schema({
    name: String,
    age: Number
}, {
    collection: 'user'
});

const db = mongoose.connection;

const UserModel = mongoose.model('User', User);

mongoose.connect('mongodb://127.0.0.1:27017/test_db', {
    user: 'admin',
    pass: 'password'
});

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('carregado'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Node.js listening on port ' + PORT);
});

app.get('/save-multiple', (_, res) => {
    UserModel.insertMany([{
        name: 'Pedro',
        age: 18,
    }, {
        name: 'Luiz',
        age: 20,
    }, {
        name: 'Paulo',
        age: 25,
    }]).then((data)=> {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).status({ error: 'error' })
    })
});

app.get('/find/:query', (req, res) => {
    const query = req.params.query;
    
    UserModel.find({
        name: query
    }, (err, result) => {
        if(err) throw err;

        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                error: 'Error'
            })
        }
    })
});

app.get('/save/:query', (req, res) => {
    const query = req.params.query.split('-');

    UserModel.create({
        name: query[0],
        age: query[1]
    }).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json(err);
    })
});

