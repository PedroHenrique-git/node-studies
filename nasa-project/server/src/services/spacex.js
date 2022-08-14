import axios from 'axios';
import { SPACEX_API_URL } from '../configs/constants';

const spacexApi = axios.create({
  baseURL: SPACEX_API_URL,
});

export default spacexApi;
