const { Router } = require('express');

const router = Router();
const loginMiddleWare = require('../middlewares');
const { tokenCtrl } = require('../controllers');

router.get('/', (req, res) => {
    res.send('logging in');
});
/*
router.post('/', (req, res) => {
    console.log(req.body);
    const json = {
        response: 'Ok',
        data: {
            userName: req.body.username,
            password: req.body.password,
        },
    };
    res.send(json);
});*/

router.post('/', (req, res, next) => {
  loginMiddleWare.validator.validate(req, res, next, {
    body: {
      usern: 'word,required',
      pass: 'word,required'
    },
  });
}, tokenCtrl.createToken);

module.exports = router;
