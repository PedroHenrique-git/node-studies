const fs = require('fs').promises
const { resolve } = require('path')

const filePath = resolve(__dirname, 'file.txt') 

fs.readFile(filePath, { encoding: 'utf-8' }).then(data => {
    console.log(data)
})