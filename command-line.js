'use strict'

const username = process.argv[2];

if(!username) {
    const appName = process.argv[1].split(require('path').sep).pop();
    console.log('Missing argument! Example: %s pedro', appName);
    process.exit(1);
}

console.log('Hello %s!', username)