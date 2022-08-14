import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = process.env.MONGODB_CONNECTION_STRING;
export const SPACEX_API_URL = 'https://api.spacexdata.com/v4';
