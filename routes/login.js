const { Router } = require('express');

const router = Router();
const loginMiddleWare = require('../middlewares');
const { usersCtrl } = require('../controllers');

router.get('/logout', usersCtrl.logout);

router.post('/', (req, res, next) => {
   loginMiddleWare.validator.validate(req, res, next, {
     body: {
       mail: 'email,required',
       password: 'word,required',
     },
   });
 }, (req, res, next) => {
  loginMiddleWare.auth.existsUser(req, res, next);
}, usersCtrl.login);

module.exports = router;
