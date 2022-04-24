const express = require('express');
const friendsRouter = require('./routes/friends.route');
const { join } = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

app.use((req, __, next) => {
  console.time();

  console.log(`
    METHOD: ${req.method}
    URL: ${req.baseUrl}${req.url}
    PARAMS: ${JSON.stringify(req.params)}
  `);
  next();

  console.timeEnd();
});

// "__dirname + '/public'"
app.use('/public', express.static(join(__dirname, '/public')));

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Helooooooooooo',
  });
});

app.use('/friends', friendsRouter);

app.use((_, res, ___) => res.status(404).json({ message: 'page not found' }));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
