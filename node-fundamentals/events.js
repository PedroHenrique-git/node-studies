const EventEmitter = require('events');
const celebrity = new EventEmitter();

//Callbacks

function raceWinCallbackWin (result) {
    if(result === 'win')
        console.log('Congratulations! You are the best!');    
}

function raceWinCallbackLost (result) {
    if(result === 'lost')
        console.log('Boo I could have better than that!');    
}

// Subscribe to celebrity for Observer 1

celebrity.on('race', raceWinCallbackWin);
celebrity.on('race', raceWinCallbackLost);

process.on('exit', (code) => {
    console.log('Process exit event with: ' + code);
});

// Emit event

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');
