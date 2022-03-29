const { EventEmitter } = require('events');

const doSomeAsynchronousOperation = () => {
    const myEvent = new EventEmitter();

    setTimeout(() => {
        myEvent.emit('error', new Error('User name cannot be empty'));
    }, 1000);

    return myEvent;
};

const event = doSomeAsynchronousOperation();

event.on('error', (err) => {
    console.log('Err --> ', err);
});

event.on('done', (result) => {
    console.log('Result --> ', result);
});

process.on('uncaughtException', (err) => {
    console.log('uncaughtException --> ', err);
});

const synchronousFn = (req, res) => {
    if(req.body.username = '') {
        throw new Error('User name cannot be empty');
    }
    return true;
};

const asynchronousFn = (req, res, time, cb) => {
    return setTimeout(function() {
        cb(null, []);
    }, time);
};

try {
    const req = {}, res = {};
    asynchronousFn(req, res, (err, rs) => {
        throw new Error('async operation exception');
    });
} catch(e) {
    console.log(e.message);
}

try {
    const req = { 
        body: {
            username: '' 
        }
    };
    const res = {};
    synchronousFn(req, res);
} catch(e) {
    console.log(e.message);
}