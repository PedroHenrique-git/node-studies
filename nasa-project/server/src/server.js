import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { loadPlanetsData } from './data';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_CONNECTION_STRING;

const server = http.createServer(app);

mongoose.connection.once('open', () => console.log('mongodb connection ready!'));
mongoose.connection.on('error', (err) => console.error(err));

async function startServer() {
    await mongoose.connect(MONGODB_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}`);
    });
}

startServer();
