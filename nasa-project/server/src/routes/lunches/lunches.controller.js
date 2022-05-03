import getAllLaunches from "../../models/launches.model";

class LaunchesController {
    getAllLunches(_, res) {
        return res.status(200).json(getAllLaunches());
    }
}

export default new LaunchesController();