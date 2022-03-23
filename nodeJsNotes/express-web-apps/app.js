const express = require('express');
const sayHello = require('./modules/get.js');
const greetMiddleware = require('./modules/greet.js');
const GreetingService = require('./modules/gretting-service');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const APP_PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index', { title: 'Test title'});
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

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
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