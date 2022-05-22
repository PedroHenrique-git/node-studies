import { addNewLaunch, getAllLaunches, removeLaunch } from "../../models/launches.model";

class LaunchesController {
    getAllLaunches(_, res) {
        return res.status(200).json(getAllLaunches());
    }

    insertNewLaunch(req, res) {
        const launch = req.body;

        if(
            !launch.mission || 
            !launch.rocket || 
            !launch.launchDate ||
            !launch.target
        ) {
            return res.status(400).json({ error: 'Missing require launch property' });
        }

        launch.launchDate = new Date(launch.launchDate);

        if(isNaN(launch.launchDate)) {
            return res.status(400).json({ error: 'Invalid launchDate' }); 
        }

        addNewLaunch(launch);
        return res.status(201).json(launch);
    }

    deleteLaunch(req, res) {
        const { id } = req.params;

        const idNumber = Number(id); 

        if(!id) {
            return res.status(400).json({ error: 'id is missing' });
        }

        if(isNaN(idNumber)) {
            return res.status(400).json({ error: 'id must be a number' });    
        }

        const deletedLaunch = removeLaunch(idNumber);

        if(!deletedLaunch) {
            return res.status(400).json({ error: 'launch does not exists' });        
        }

        return res.status(200).json(deletedLaunch);
    }
}

export default new LaunchesController();