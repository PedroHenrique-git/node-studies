import express from 'express';
import hbs from 'hbs';
import { join } from 'path';
import postsRouter from './routes/posts-router';

const app = express();

app.use(express.json());

app.set('view engine', 'hbs');
hbs.registerPartials(join(__dirname, "/views/partials"));

app.set('views', join(__dirname, 'views'));

const PORT = process.env.PORT || 6000;          

app.use('/posts', postsRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
