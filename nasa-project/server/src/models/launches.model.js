const lunches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true
};

lunches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(lunches.values());
}

export default getAllLaunches; 