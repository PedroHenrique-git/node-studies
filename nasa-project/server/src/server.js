import http from 'http';
import app from './app';
import { loadPlanetsData } from './data';
import { mongoConnect } from './services/mongo';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}`);
    });
}

startServer();
