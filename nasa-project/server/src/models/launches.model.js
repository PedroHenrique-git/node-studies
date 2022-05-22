const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true
};

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber += 1; 

    const newLaunch = {
        ...launch,
        flightNumber: latestFlightNumber,
        customers: ['Zero to master', 'Nasa'],
        upcoming: true,
        success: true
    }

    launches.set(latestFlightNumber, newLaunch);
}

function removeLaunch(id) {
    const deletedLaunch = launches.get(id);

    if(!deletedLaunch) return false;

    deletedLaunch.upcoming = false;
    deletedLaunch.success = false;
    
    return deletedLaunch; 
}

addNewLaunch(launch);

export {
    getAllLaunches,
    addNewLaunch,
    removeLaunch
};

