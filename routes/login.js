const { Router } = require('express');

const router = Router();
const loginMiddleWare = require('../middlewares');
const { usersCtrl } = require('../Controllers');

router.get('/logout', usersCtrl.logout);

router.post('/', (req, res, next) => {
  loginMiddleWare.auth.existsUser(req, res, next);
}, usersCtrl.login);

module.exports = router;
