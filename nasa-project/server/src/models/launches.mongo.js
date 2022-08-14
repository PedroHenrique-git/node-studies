import { model, Schema } from 'mongoose';

const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    require: true,
  },
  mission: {
    type: String,
    require: true,
  },
  rocket: {
    type: String,
    require: true,
  },
  launchDate: {
    type: Date,
    require: true,
  },
  target: {
    type: String,
    require: false,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    require: true,
  },
  success: {
    type: Boolean,
    require: true,
    default: true,
  },
});

const Launch = model('Launch', launchesSchema);

export { Launch };
