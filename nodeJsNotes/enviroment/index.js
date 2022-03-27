console.log(process.env.PWD);
console.log(process.argv);

const enviroment = require('./enviroment');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(enviroment);

const someVal = properties.get('main.app.port');

console.log('SOME VAL --> ', someVal);

let total = 0;

for(let i = 2; i < process.argv.length; i++) {
    total += Number(process.argv[i]);
}

console.log('TOTAL OF ARGS --> ', total);