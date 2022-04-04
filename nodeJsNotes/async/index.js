const async = require('async');

function shortTimeFunction(callback) {
    setTimeout(() => {
        callback(null, 'resultOfShortTime');
    });
}

function mediumTimeFunction(callback) {
    setTimeout(() => {
        callback(null, 'resultOfMediumTime');
    });
}

function longTimeFunction(callback) {
    setTimeout(() => {
        callback(null, 'resultOfLongTime');
    });
}

async.parallel({
    short: shortTimeFunction,
    medium: mediumTimeFunction,
    long: longTimeFunction
}, (err, results) => {
    if(err) {
        return console.error(err);
    }
    console.log(results);
});

function createUser(userName, callback) {
    callback(null);
}

const arrayOfData = ['Ritu', 'Sid', 'Tom'];

async.each(arrayOfData, (eachUserName, callback) => {
    console.log('Creating user ' + eachUserName);
    createUser(eachUserName, callback);
}, (err) => {
    if(err) {
        console.log('unable to create user');
    } else {
        console.log('All user created successfully');
    }
});

async.series([
    shortTimeFunction,
    mediumTimeFunction,
    longTimeFunction
], (err, results) => {
    if(err) {
        return console.error(err);
    }

    console.log(results);
});

function getUserRequest(callback) {
    setTimeout(() => {
        const userResult = {
            name: 'Aamu'
        }

        callback(null, userResult);
    }, 500);
}

function getUserFriendsRequest(user, callback) {
    setTimeout(() => {
        let friendsResult = [];

        if(user.name === 'Aamu') {
            friendsResult = [{
                name: 'Alice'
            }, {
                name: 'Bob'
            }]
        }

        callback(null, friendsResult)
    }, 500);
}

async.waterfall([
    getUserRequest,
    getUserFriendsRequest
], (err, results) => {
    if(err) {
        return console.log(err);
    }
    console.log(JSON.stringify(results));
});

function recursiveAction(n, callback) {
    //callback(err, result);
}

async.times(5, (n, next) => {
    recursiveAction(n, (err, result) => {
        next(err, result);
    })
}, (err, results) => {
    console.log('RESULT TIMES --> ', results)
});