import { getAllLaunches, removeLaunch, scheduleNewLaunch } from "../../models/launches.model";

class LaunchesController {
    async getAllLaunches(_, res) {
        return res.status(200).json(await getAllLaunches());
    }

    async insertNewLaunch(req, res) {
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

        await scheduleNewLaunch(launch);
        return res.status(201).json(launch);
    }

    async deleteLaunch(req, res) {
        const { id } = req.params;

        const idNumber = Number(id); 

        if(!id) {
            return res.status(400).json({ error: 'id is missing' });
        }

        if(isNaN(idNumber)) {
            return res.status(400).json({ error: 'id must be a number' });    
        }

        const deletedLaunch = await removeLaunch(idNumber);

        if(!deletedLaunch) {
            return res.status(400).json({ error: 'launch does not exists' });        
        }

        return res.status(200).json({ message: 'launch aborted' });
    }
}

export default new LaunchesController();