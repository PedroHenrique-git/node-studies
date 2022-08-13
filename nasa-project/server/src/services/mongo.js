import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_CONNECTION_STRING;

mongoose.connection.once('open', () => console.log('mongodb connection ready!'));
mongoose.connection.on('error', (err) => console.error(err));

export async function mongoConnect() {
    await mongoose.connect(MONGODB_URL);
}

export async function mongoDisconnect() {
    await mongoose.disconnect();
}