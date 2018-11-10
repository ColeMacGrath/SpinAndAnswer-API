const router = require('express').Router();
const { usersCtrl } = require('../controllers');
const registerMiddleWare = require('../middlewares');
const { auth } = require('../middlewares');
const multer  = require('multer');
const fs  = require('fs');
const upload = multer({ dest: 'upload/'});
// Obtain all the active users
router.get('/', [auth.haveSession, auth.havePermissions], usersCtrl.getAll);
//Obtain a specific user by its id
router.get('/:userId', [auth.haveSession, auth.canCheck], usersCtrl.get);
//Get every questions of user
router.get('/:userId/questions', [auth.canCheck, auth.haveSession], usersCtrl.getQuestionsBy);
//Delete logically a user giving its id
router.delete('/:userId', [auth.haveSession, auth.havePermissions], usersCtrl.changeActive);
//Create a new user validating the information given by the user
router.post('/', (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       name: 'word,required',
       mail: 'email,required',
       username: 'word,required',
       password: 'word,required',
       second_mail: 'email,required',
     },
   });
 }, usersCtrl.create);
// Modify the whole user resource giving its id
router.put('/:userId', [auth.haveSession, auth.canCheck, (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       name: 'word,required',
       mail: 'email,required',
       username: 'word,required',
       password: 'word,required',
       second_mail: 'email,required',
       admin: 'number',
       active: 'number',
     },
   });
 }], usersCtrl.modify);
// Obtain all the friends of a specific user
router.get('/:userId/friends', [auth.haveSession, auth.canCheck], usersCtrl.getAllFriends);
// Create a new friend
router.post('/friends/', [auth.haveSession, (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       userId: 'number,required',
       friendId: 'number,required',
     },
   });
 }], usersCtrl.addFriend);
// Delete a friend of a specific user
router.delete('/:userId/friends/', [auth.haveSession, auth.canCheck, (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       friendId: 'number,required',
     },
   });
 }], usersCtrl.modifyFriendship);
// Accept a friend request
router.patch('/friends/', [auth.haveSession, (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       userId: 'number,required',
       friendId: 'number,required',
     },
   });
 }], usersCtrl.acceptFriend);
//Get url by mail to reset password
router.patch('/reset', (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       mail: 'email,required',
     },
   });
 }, usersCtrl.resetPassword);
//Reset password
router.patch('/reset/:tokenId', [auth.haveSession, (req, res, next) => {
   registerMiddleWare.validator.validate(req, res, next, {
     body: {
       password: 'word,required',
     },
   });
 }], usersCtrl.changePassword);

router.get('/:userId/friendshipRequest', [auth.haveSession, auth.canCheck], usersCtrl.friendshipRequest);

router.post('/upload', upload.single('picture'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  fs.rename(req.file.path, `uploads/file-${req.file.filename}`, (err) => {
  if (err) throw err;
    console.log('Rename complete!');
  });
  next();
  res.send('finished');
}, (req, res) => {
  res.send('Uploading');
});

module.exports = router;
