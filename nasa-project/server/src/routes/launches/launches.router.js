import express from 'express';
import LaunchesController from './launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/', LaunchesController.getAllLaunches);
launchesRouter.post('/', LaunchesController.insertNewLaunch);

export default launchesRouter;