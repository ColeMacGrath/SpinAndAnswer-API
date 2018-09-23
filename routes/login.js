const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('logging in')
});

router.post('/', /*loginMiddleware.checkIntegrity*/(req, res) => {
  console.log(req.body);
  const json = {
    response: 'Ok',
    data: {
      usernName: req.body.username,
      password : req.body.password,
    },
  }
});

module.exports = router;
