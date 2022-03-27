const { EventEmitter } = require('events');

class Dog extends EventEmitter {}
class Food {}

const dog = new Dog();

dog.on('chew', (item) => {
    if(item instanceof Food) {
        console.log('Good dog');
    } else {
        console.log(`Time to buy another ${item}`);
    }
})
.on('message', function() {
    console.log('message')
})
.on('message', function() {
    console.log('message')
});

dog.emit('chew', 'shoe');
console.log(dog.eventNames());
dog.removeAllListeners();
console.log(dog.eventNames())
const bacon  = new Food();
dog.emit('chew', bacon);

console.log('QTD --> ', dog.listenerCount('message'));