console.log(process);
console.log(module);
console.log(global.URL)

const myUrl = new URL('/foo', 'https://example.org');

const mission = process.argv[2];

if(mission === 'learn') {
    console.log('Time to write some Node code!');
} else {
    console.log(`Is ${mission} really more fun ?`);
}

console.log(__dirname, __filename);
console.log(myUrl);