const express = require('express');
const { friends } = require('./models/friends');

const PORT = process.env.PORT || 3000;

const app = express();

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
