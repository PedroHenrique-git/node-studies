import 'https://deno.land/std/examples/welcome.ts'

type fn = (arg1: number, arg2: number) => number

const sum: fn = (n1: number, n2: number) => n1 + n2

console.log('the sum is -> ', sum(10, 10))

console.log('Deno args --> ', Deno.args)

const decoder = new TextDecoder('utf-8')
const fileData = await Deno.readFile('file.txt')

console.log('file Data --> ', decoder.decode(fileData))

setTimeout(() => {
    console.log('teste')
    console.log(Deno.metrics())
}, 1000)

console.log('window --> ', window)
