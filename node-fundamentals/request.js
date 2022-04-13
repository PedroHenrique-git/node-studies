const { Axios } = require('axios');

const axios = new Axios();

axios.get('https://www.google.com')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        console.log('All done!')
    });