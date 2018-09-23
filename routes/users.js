const { Router } = require('express');
const router = Router();
const dateMidd = require('../middlewares');

router.get('/', (req, res) => {
  const users = [
    {
      user_id: 1,
      username: 'Juan',
      name: 'juan',
      admin: 0,
      email: 'mail@mail.com',
    },
    {
      user_id: 2,
      username: 'Pedro',
      name: 'pedro',
      admin: 0,
      email: 'mail2@mail2.com',
    },
  ];
  const json = {
    response: 'Ok',
    data: users,
    total: 2,
  }

  res.send(json);
});

router.get('/:user_id', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            user_id: req.params.user_id,
            username: `UserName${req.params.user_id}`,
            name: `Name${req.params.user_id}@mail.com`,
            mail: `Mail${req.params.user_id}@mail.com`,
        },
    };

    res.send(json);
});

router.post('/', /*userMiddleware.checkIntegrity*/(req, res) => {
  console.log(req.body);
  const json = {
    response: 'Ok',
    data: {
      user_id: 100,
      //valid: req.body,
      name: req.body.name
    },
  }
});

router.put('/:user_id', (req, res) => {
  res.send('editado');
});

module.exports = router;
