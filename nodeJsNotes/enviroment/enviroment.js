process.argv.forEach(function(val, index, array) {
    const arg = val.split('=');
    if(arg.length > 0) {
        if(arg[0] === 'env') {
            const env = require('./env/' + arg[1] + '.properties');
            module.exports = env;
        }
    }
});