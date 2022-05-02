const { parse } = require('csv-parse');
const { createReadStream } = require('fs');
const { join } = require('path');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        const fileStream = createReadStream(join(__dirname, 'kepler_data.csv'));
    
        const parserOptions = {
            comment: '#',
            columns: true
        }; 

        const dataCallback = (data) => {
            if(isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        }

        fileStream.pipe(parse(parserOptions))
            .on('data', dataCallback)
            .on('error', (err) => {
                reject(err);
            })
            .on('end', () => {
                resolve();
            });
    });
}

module.exports = {
    habitablePlanets,
    loadPlanetsData
};

