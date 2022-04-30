import bodyParser from 'body-parser';
import express from 'express';
import hbs from 'hbs';
import { join } from 'path';
import postsRouter from './routes/posts-router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));               

app.set('view engine', 'hbs');
hbs.registerPartials(join(__dirname, "/views/partials"));

app.set('views', join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;          

app.get('/', (_, res) => {
    res.render('home-page');
});

app.use('/posts', postsRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
