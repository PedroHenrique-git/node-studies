const promise = (value) => new Promise((resolve, reject) => {
    if(value) {
        resolve(value)
    } else {
        reject(value)
    }
})

promise(true)
    .then(data => console.log('data --> ', data))
    .catch(data => console.log('error --> ', data))
    .finally(() => console.log('finally'))



const promise1 = new Promise((resolve) => {
    setTimeout(resolve, 100, 'promise 1')
})

const promise2 = new Promise((resolve) => {
    setTimeout(resolve, 1000, 'promise 2')
})

const promise3 = new Promise((resolve) => {
    setTimeout(resolve, 5000, 'promise 3')
})

Promise.all([promise1, promise2, promise3]).then(values => console.log(values))
Promise.race([promise1, promise2, promise3]).then(values => console.log(values))
Promise.allSettled([promise1, promise2, promise3]).then(values => console.log(values))