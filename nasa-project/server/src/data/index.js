import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { join } from 'path';
import { getAllPlanets, savePlanet } from '../models/planets.model';

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

        const dataCallback = async (data) => {
            if(isHabitablePlanet(data)) {
                await savePlanet(data);
            }
        }

        fileStream.pipe(parse(parserOptions))
            .on('data', dataCallback)
            .on('error', (err) => {
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found !`);
                resolve();
            });
    });
}

module.exports = {
    habitablePlanets,
    loadPlanetsData
};

