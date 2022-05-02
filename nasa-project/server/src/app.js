import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import planetsRouter from './routes/planets/planets.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(planetsRouter);
app.use(express.static(join(__dirname, '..', 'public')))

app.get('/', (_, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default app;