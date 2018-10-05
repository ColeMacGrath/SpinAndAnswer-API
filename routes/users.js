const router = require('express').Router();
const { usersCtrl } = require('../controllers');

const registerMiddleWare = require('../middlewares');

router.get('/', usersCtrl.getAll);

router.get('/:userId', usersCtrl.get);

router.delete('/:userId', usersCtrl.changeActive);

router.post('/', (req, res, next) => {
  registerMiddleWare.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      mail: 'email,required',
      username: 'word,required',
      password: 'word,required',
    },
  });
}, usersCtrl.create);

router.put('/:userId', usersCtrl.modify);

// FRIENDS
router.get('/friends/:friendId', usersCtrl.getFriend);

router.get('/:userId/friends', usersCtrl.getAllFriends);

router.post('/friends/', usersCtrl.addFriend);

router.delete('/friends/:friend_id', (req, res) => {
    res.send(`${req.params.username} : ${req.params.user_id} deleted`);
});

module.exports = router;
