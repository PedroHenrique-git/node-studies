import express from 'express';
import launchesRouter from '../routes/launches/launches.router';
import planetsRouter from '../routes/planets/planets.router';

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

export { api };
