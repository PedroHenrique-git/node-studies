import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import launchesRouter from './routes/launches/launches.router';
import planetsRouter from './routes/planets/planets.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.use(express.static(join(__dirname, '..', 'public')))

app.get('/*', (_, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default app;