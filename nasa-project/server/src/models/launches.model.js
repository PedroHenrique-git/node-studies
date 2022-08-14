import spacexApi from '../services/spacex';
import { Launch } from './launches.mongo';
import { Planet } from './planets.mongo';

const DEFAULT_FLIGHT_NUMBER = 100;

const defaultLaunch = {
  flightNumber: 100,
  mission: 'Kepler exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

async function addDefaultLaunch() {
  await saveLaunch(defaultLaunch);
}

async function saveLaunch(launch) {
  try {
    const planet = await Planet.findOne({ kepler_name: launch.target });

    if (!planet) {
      throw new Error('No matching planet was found!');
    }

    await Launch.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true },
    );
  } catch (err) {
    console.log(`Could not save launch ${err}`);
  }
}

async function scheduleNewLaunch(launch) {
  try {
    const latestFlightNumber = await getLatestFlightNumber();

    const newLaunch = {
      ...launch,
      flightNumber: latestFlightNumber + 1,
      customers: ['ZTM', 'NASA'],
      success: true,
      upcoming: true,
    };

    await saveLaunch(newLaunch);
  } catch (err) {
    console.log(`Could not schedule new launch ${err}`);
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await Launch.findOne().sort('-flightNumber');

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await Launch.find({});
}

async function removeLaunch(id) {
  try {
    const launchById = await getLaunchById(id);

    if (!launchById) return false;

    const deletedLaunch = await Launch.updateOne(
      { flightNumber: id },
      {
        upcoming: false,
        success: false,
      },
    );

    return deletedLaunch.modifiedCount === 1;
  } catch (err) {
    console.log(`Could not delete launch ${err}`);
  }
}

async function getLaunchById(id) {
  return await Launch.findOne({ flightNumber: id });
}

async function loadLaunchData() {
  try {
    const requestLaunches = await spacexApi.post(`/launches/query`, {
      query: {},
      options: {
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    const launches = await requestLaunches.data.docs;

    const rocketsNames = launches.map((launch) => launch.rocket.name);
    console.log('rocketsNames --> ', rocketsNames);
    console.log('Downloading launches data...');
  } catch (err) {
    console.log(`Could not load launches ${err}`);
  }
}

addDefaultLaunch();

export {
  getAllLaunches,
  saveLaunch,
  scheduleNewLaunch,
  removeLaunch,
  loadLaunchData,
};
