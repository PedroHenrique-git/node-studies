import mongoose from 'mongoose';
import { MONGO_URL } from '../configs/constants';

mongoose.connection.once('open', () =>
  console.log('mongodb connection ready!'),
);
mongoose.connection.on('error', (err) => console.error(err));

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
