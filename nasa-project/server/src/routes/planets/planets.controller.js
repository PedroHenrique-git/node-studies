import { getAllPlanets } from '../../models/planets.model';

class PlanetsController {
  async getAllPlanets(_, res) {
    return res.status(200).json(await getAllPlanets());
  }
}

export default new PlanetsController();
