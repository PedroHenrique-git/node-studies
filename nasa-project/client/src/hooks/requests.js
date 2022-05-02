import makeRequest from "../utils/makeRequest";

const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
  return await makeRequest(`${API_URL}/planets`);
}

async function httpGetLaunches() {
  const fetchedLaunches = await makeRequest(`${API_URL}/lunches`);
  return fetchedLaunches.sort((lunchA, lunchB) => lunchA.flightNumber - lunchB.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
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
