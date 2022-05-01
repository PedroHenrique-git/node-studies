import planets from "../../models/planets.model";

class PlanetsController {
    getAllPlanets(_, res) {
        return res.status(200).json(planets);    
    }    
}

export default new PlanetsController(); 