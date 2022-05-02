import express from 'express';
import LaunchesController from './lunches.controller';

const lunchesRouter = express.Router();

lunchesRouter.get('/lunches', LaunchesController.getAllLunches);

export default lunchesRouter;