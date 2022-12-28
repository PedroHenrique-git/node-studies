const fetch = require('node-fetch')

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

const results = async () => {
    const result1 = await Promise.all([promise1, promise2, promise3])
    const result2 =  await Promise.race([promise1, promise2, promise3])
    const result3 = await Promise.allSettled([promise1, promise2, promise3])

    console.log("----------------------")
    console.log('r1 ==> ', result1)
    console.log('r2 ==> ', result2)
    console.log('r3 ==> ', result3)
    console.log("----------------------")
}

results()

console.log("for await of")

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/todos',
    'https://jsonplaceholder.typicode.com/users'
]

async function getDataFromForAwait() {
    const requests = urls.map(u => fetch(u).then(r => r.json()))

    for await (const data of requests) {
        // console.log('data --> ', data)
    }
}

getDataFromForAwait()