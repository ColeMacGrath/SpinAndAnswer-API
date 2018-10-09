const router = require('express').Router();
const { usersCtrl } = require('../controllers');

const registerMiddleWare = require('../middlewares');

// Obtain all the active users
router.get('/', usersCtrl.getAll);

// Obtain a specific user by its id
router.get('/:userId', usersCtrl.get);

// Delete logically a user giving its id
router.delete('/:userId', usersCtrl.changeActive);

// Create a new user validating the information given by the user
router.post('/', (req, res, next) => {
  registerMiddleWare.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      mail: 'email,required',
      username: 'word,required',
      password: 'word,required'
    },
  });
}, usersCtrl.create);

// Modify the whole user resource giving its id
router.put('/:userId', usersCtrl.modify);

// Obtain all the friends of a specific user
router.get('/:userId/friends', usersCtrl.getAllFriends);

// Create a new friend
router.post('/friends/', usersCtrl.addFriend);

// Delete a friend of a specific user
router.delete('/:userId/friends/', usersCtrl.modifyFriendship);

// Accept a friend request
router.patch('/friends/', usersCtrl.acceptFriend);

module.exports = router;
