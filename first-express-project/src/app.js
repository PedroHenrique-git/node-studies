const express = require('express');
const friendsRouter = require('./routes/friends.route');
const { join, resolve } = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

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

app.use('/friends', friendsRouter);

app.use((_, res, ___) => res.status(404).json({ message: 'page not found' }));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
