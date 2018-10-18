const router = require('express').Router();
const { tokenCtrl } = require('../Controllers');
const middlewares = require('../middlewares');

//router.post('/register', [middlewares.auth.register]);

router.get('/login', (req, res) => {
    res.send('logging in');
});

router.post('/login', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      usern: 'word,required',
      pass: 'word,required'
    },
  });
}, tokenCtrl.createToken);

router.delete('/logout', tokenCtrl.changeTokenStatus);

module.exports = router;
