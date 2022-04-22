const express = require('express');
const { friends } = require('./models/friends');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, __, next) => {
  console.time();

  console.log(`
    METHOD: ${req.method}
    URL: ${req.url}
    PARAMS: ${JSON.stringify(req.params)}
  `);
  next();

  console.timeEnd();
});

app.use(express.json());

app.post('/friends', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'missing friend name' });
  }

  const newFriend = {
    id: crypto.randomUUID(),
    name: req.body.name,
  };

  friends.push(newFriend);

  res.status(200).json(newFriend);
});

app.get('/friends', (_, res) => {
  res.status(200).json(friends);
});

app.get('/friends/:id', (req, res) => {
  const { id } = req.params;
  const friend = friends.find((friend) => String(friend.id) === id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ message: 'friend not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
