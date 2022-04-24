const express = require('express');
const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, _, next) => {
  console.log(`IP: ${req.ip}`);
  next();
});

friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:id', friendsController.getFriend);
friendsRouter.post('/', friendsController.createFriend);

module.exports = friendsRouter;
