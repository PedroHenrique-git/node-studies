const sayHello = require('./sayHello');
const { sayHello: sayHellov2  } = require('./sayHellov2');
const { hello } = require('./sayHellov3');
const http = require('http');
const split_module = require('./folder-module');
const auth = require('./my-module/auth');

const apath = require.resolve('./my-module/auth.js');
delete require.cache[apath];

auth.email();
auth.facebook();
auth.stack_overflow();
auth.twitter();

console.log(split_module);
console.log(sayHello('Pedro'));
console.log(sayHellov2('Pedro'));
console.log(hello('Pedro'));