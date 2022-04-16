const { parse } = require('csv-parse');
const { createReadStream } = require('fs');

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

try {
    const fileStream = createReadStream(__dirname + '/kepler_data.csv');
    const results = [];

    fileStream
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if(isHabitablePlanet(data)) {
                results.push(data)
            }
        })
        .on('error', (err) => {
            console.log('ERR --> ', err);
        })
        .on('end', () => {
            const planetsInfos = results.map((planet) => ({
                planet_name: planet['kepler_name']
            }));
            console.table(planetsInfos);
            console.log(`${results.length} habitable planets found!`);
        })
} catch(e) {
    console.log('ERROR --> ', e)
}