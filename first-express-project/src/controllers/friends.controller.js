const { friends } = require('../models/friends.model');
const crypto = require('crypto');

function getFriends(_, res) {
  return res.status(200).json(friends);
}

function getFriend(req, res) {
  const { id } = req.params;
  const friend = friends.find((friend) => String(friend.id) === id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ message: 'friend not found' });
  }
}

function createFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({ message: 'missing friend name' });
  }

  const newFriend = {
    id: crypto.randomUUID(),
    name: req.body.name,
  };

  friends.push(newFriend);

  res.status(200).json(newFriend);
}

module.exports = {
  getFriends,
  getFriend,
  createFriend,
};
