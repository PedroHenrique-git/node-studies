import lunches from "../../models/launches.model";

class LaunchesController {
    getAllLunches(_, res) {
        const lunchesArray = Array.from(lunches.values());
        return res.status(200).json(lunchesArray);
    }
}

export default new LaunchesController();