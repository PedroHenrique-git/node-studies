import { model, Schema } from 'mongoose';

const planetsSchema = new Schema({
    kepler_name: {
        type: String,
        require: true    
    }
});

const Planet = model('Planet', planetsSchema);

export { Planet };
