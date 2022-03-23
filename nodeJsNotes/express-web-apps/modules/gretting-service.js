class GreetingService {
    constructor(greeting = "Hello") {
        this.greeting = greeting;
    }

    createGreeting(name) {
        return `${this.greeting}, ${name}`;
    }
}

module.exports = GreetingService;