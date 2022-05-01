import http from 'http';
import { loadPlanetsData } from '../data';
import app from './app';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}`);
    });
}

startServer();
