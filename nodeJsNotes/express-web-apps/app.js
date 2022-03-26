const express = require('express');
const sayHello = require('./modules/get.js');
const greetMiddleware = require('./modules/greet.js');
const GreetingService = require('./modules/gretting-service');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const APP_PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(function(req, res, next) {
    req.user = 'testuser';
    next();
});

app.post('/post-data-here', function(req, res, next) {
    console.log('BODY --> ', req.body);
});

app.get('/', (req, res) => {
    const user = req.user;
    console.log(user);
    res.render('index', { title: 'Test title', user });
});

app.use(cors());

app.get('/get',  (req, res) => {
    const info = {
        'string_value': 'StackOverflow'
    };

    res.status(200).json(info);
});

app.use(express.static('public'));
app.use('/static', express.static('public'));

/*
    app.use((req, res, next) => {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    });
*/

app.get('/names', function(req, res, next) {
    if(req.params.name === 'john') {
        return res.send('VALID NAME');
    } else {
        next(new Error('Not valid name'));
    }
});

app.use(function(req, res, next) {
    const afterResponse = () => {
        req.removeListener('finish', afterResponse);
        req.removeListener('close', afterResponse);
        console.log('EVENTO DISPARADO');
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    next();
});

app.get('/setcookie', function(req, res) {
    res.cookie('username', 'john doe', {
        maxAge: 90000,
        httpOnly: true
    });
    return res.send('Cookie has been set');
});

app.get('/getcookie', function(req, res) {
    const username = req.cookies['username'];
    if(username) {
        return res.send(username);
    }
    return res.send('No cookie found');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.render('error', {
        message: err.message,
        error: err
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test/:id', (req, res) => {
    console.log('ORIGINAL URL -->' , req.originalUrl);
    console.log('PARAMS --> ', req.params);
    console.log('QUERY --> ', req.query);
    console.log('HEADER --> ', req.get('Content-type'));
    res.send('123');
})

app.get('/ping', sayHello);
app.post('/post', (req, res) => {});
app.patch('/patch', (req, res) => {});
app.put('/put', (req, res) => {});
app.delete('/delete', (req, res) => {});

//app.use('/api/v1', greetMiddleware({ greeting: 'Hello world!' }));
app.use('/api/v1/service1', greetMiddleware({ service: new GreetingService('Hello') }));
app.use('/api/v1/service2', greetMiddleware({ service: new GreetingService('Hi') }));

app.listen(APP_PORT);