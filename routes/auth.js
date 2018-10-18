const router = require('express').router();
const { usersCtrl } = require('../Controllers');
const middlewares = require('../middlewares');

router.post('/register', [middlewares.auth.register]);
router.post('/login');
router.post('/logout');

module.exports = router;
