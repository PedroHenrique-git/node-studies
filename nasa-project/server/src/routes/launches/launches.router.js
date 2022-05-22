import express from 'express';
import LaunchesController from './launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/', LaunchesController.getAllLaunches);
launchesRouter.post('/', LaunchesController.insertNewLaunch);
launchesRouter.delete('/:id', LaunchesController.deleteLaunch);

export default launchesRouter;