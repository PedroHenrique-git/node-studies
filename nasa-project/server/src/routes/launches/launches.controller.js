import { addNewLaunch, getAllLaunches } from "../../models/launches.model";

class LaunchesController {
    getAllLaunches(_, res) {
        return res.status(200).json(getAllLaunches());
    }

    insertNewLaunch(req, res) {
        const launch = req.body;

        launch.launchDate = new Date(launch.launchDate);

        addNewLaunch(launch);
        return res.status(201).json(launch);
    }
}

export default new LaunchesController();