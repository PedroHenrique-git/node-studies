import { Planet } from './planets.mongo';

async function getAllPlanets() {
  return await Planet.find({});
}

async function savePlanet(planet) {
  try {
    const planetObj = { kepler_name: planet.kepler_name };
    await Planet.updateOne(planetObj, planetObj, { upsert: true });
  } catch (err) {
    console.log(`Could not save planet ${err}`);
  }
}

export { getAllPlanets, savePlanet };
