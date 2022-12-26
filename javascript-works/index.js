const number = 610

const string = 'some text'

let human = {
    firstName: 'Andrei',
    lastName: 'Neagoie'
}

human = 5

function subtractTwo(num) {
    return num - 2
}

function calculate() {
    const sumTotal = 4 + 5
    return subtractTwo(sumTotal)
}

console.log()

console.log(calculate())
console.log(number)
console.log(string)
console.table(human)
console.log(calculate())

console.log()