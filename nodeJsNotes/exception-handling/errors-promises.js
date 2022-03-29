const p = new Promise((resolve, reject) => {
    reject(new Error('ops'));
});

p
.then(() => console.log('wont be called'))
.catch(e => console.log(e.message))
.then(() => console.log('hello'))