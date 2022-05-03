import makeRequest from "../utils/makeRequest";

const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
  return await makeRequest(`${API_URL}/planets`);
}

async function httpGetLaunches() {
  const fetchedLaunches = await makeRequest(`${API_URL}/launches`);
  return fetchedLaunches.sort((launchA, launchB) => launchA.flightNumber - launchB.flightNumber);
}

async function httpSubmitLaunch(launch) {
  const insertedLaunch = await makeRequest(`${API_URL}/launches`, {
    method: 'POST',
    body: JSON.stringify(launch)
  });
  return insertedLaunch;
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
