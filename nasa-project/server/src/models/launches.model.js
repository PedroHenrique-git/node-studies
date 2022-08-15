import { DEFAULT_FLIGHT_NUMBER } from '../configs/constants';
import spacexApi from '../services/spacex';
import { Launch } from './launches.mongo';
import { Planet } from './planets.mongo';

async function saveLaunch(launch) {
  try {
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
    const planet = await Planet.findOne({ kepler_name: launch.target });

    if (!planet) {
      throw new Error('No matching planet was found!');
    }

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

async function getAllLaunches(options) {
  const { page, order, skip, limit } = options;

  const totalPages = Math.ceil((await Launch.count()) / limit);
  const nextPage = page !== totalPages ? page + 1 : null;
  const prevPage = page !== 1 ? page - 1 : null;

  const paginationConfig = {
    totalPages,
    nextPage,
    prevPage,
    order,
  };

  const launches = await Launch.find({})
    .sort({ flightNumber: order === 'Asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  return {
    data: launches,
    paginationConfig,
  };
}

async function removeLaunch(id) {
  try {
    const launchById = await findLaunch({ flightNumber: id });

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

async function findLaunch(filter) {
  return await Launch.findOne(filter);
}

async function populateLaunches() {
  try {
    const requestLaunches = await spacexApi.post(`/launches/query`, {
      query: {},
      options: {
        pagination: false,
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

    if (requestLaunches.status !== 200) {
      throw new Error('Launch data download failed');
    }

    const launchDocs = requestLaunches.data.docs;

    for (const launchDoc of launchDocs) {
      const payloads = launchDoc['payloads'];

      const customers = payloads.flatMap((payload) => {
        return payload['customers'];
      });

      const launch = {
        flightNumber: launchDoc['flight_number'],
        mission: launchDoc['name'],
        rocket: launchDoc['rocket']['name'],
        launchDate: launchDoc['date_local'],
        upcoming: launchDoc['upcoming'],
        success: launchDoc['success'],
        customers,
      };

      await saveLaunch(launch);
    }
  } catch (err) {
    console.log(`Could not populate launches ${err}`);
  }
}

async function loadLaunchData() {
  try {
    const fistLaunch = await findLaunch({
      flightNumber: 1,
      rocket: 'Falcon 1',
      mission: 'FalconSat',
    });

    if (fistLaunch) return;

    await populateLaunches();
  } catch (err) {
    console.log(`Could not load launches ${err}`);
  }
}

export {
  getAllLaunches,
  saveLaunch,
  scheduleNewLaunch,
  removeLaunch,
  loadLaunchData,
};
