import express from 'express';
import PlanetsController from './planets.controller';

const planetsRouter = express.Router();

planetsRouter.get('/', PlanetsController.getAllPlanets);

export default planetsRouter;