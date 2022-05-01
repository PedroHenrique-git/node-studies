import cors from 'cors';
import express from 'express';
import planetsRouter from './routes/planets/planets.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(planetsRouter);

app.get('/', (req, res) => {
    res.send('HEllo');
});

export default app;