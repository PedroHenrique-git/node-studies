import makeRequest from "../utils/makeRequest";

const API_URL = 'http://localhost:8000/v1';

async function httpGetPlanets() {
  return await makeRequest(`${API_URL}/planets`);
}

async function httpGetLaunches() {
  const fetchedLaunches = await makeRequest(`${API_URL}/launches`);
  return fetchedLaunches;
}

async function httpSubmitLaunch(launch) {
  const insertedLaunch = await makeRequest(`${API_URL}/launches`, {
    method: 'POST',
    body: JSON.stringify(launch)
  });
  return insertedLaunch;
}

async function httpAbortLaunch(id) {
  const deletedLaunch = await makeRequest(`${API_URL}/launches/${id}`, {
    method: 'DELETE'
  });
  return deletedLaunch;
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};

