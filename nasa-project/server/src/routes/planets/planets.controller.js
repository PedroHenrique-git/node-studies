import getAllPlanets from "../../models/planets.model";

class PlanetsController {
    getAllPlanets(_, res) {
        return res.status(200).json(getAllPlanets());    
    }    
}

export default new PlanetsController(); 