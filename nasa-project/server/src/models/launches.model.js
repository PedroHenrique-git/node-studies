import { Launch } from "./launches.mongo";
import { Planet } from './planets.mongo';

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const defaultLaunch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true
};

async function addDefaultLaunch() {
    await saveLaunch(defaultLaunch);
}

async function saveLaunch(launch) {
    try {
        const planet = await Planet.findOne({ kepler_name: launch.target });

        if(!planet) {
            throw new Error("No matching planet was found!");
        }
        
        await Launch.updateOne({ flightNumber: launch.flightNumber }, launch, { upsert: true })
    } catch(err) {
        console.log(`Could not save launch ${err}`);
    }
}

async function scheduleNewLaunch(launch) {
    try {
        const latestFlightNumber = await getLatestFlightNumber();

        const newLaunch = {
            ...launch,
            flightNumber: latestFlightNumber + 1, 
            customers: ['ZTM','NASA'],
            success: true,
            upcoming: true
        }

        await saveLaunch(newLaunch);
    } catch(err) {
        console.log(`Could not schedule new launch ${err}`);    
    }
}

async function getLatestFlightNumber() {
    const latestLaunch = await Launch.findOne().sort('-flightNumber'); 

    if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await Launch.find({});
}

function removeLaunch(id) {
    const deletedLaunch = launches.get(id);

    if(!deletedLaunch) return false;

    deletedLaunch.upcoming = false;
    deletedLaunch.success = false;
    
    return deletedLaunch; 
}

addDefaultLaunch();

export {
    getAllLaunches,
    saveLaunch,
    scheduleNewLaunch,
    removeLaunch
};

