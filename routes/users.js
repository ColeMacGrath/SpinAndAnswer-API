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
router.get('/friends', (req, res) => {
    const users = [
        {
            username: 'Juan',
            name: 'juan',
            email: 'mail@mail.com',
        },
        {
            username: 'Pedro',
            name: 'pedro',
            email: 'mail2@mail2.com',
        },
    ];
    const json = {
        response: 'Ok',
        data: users,
        total: 2,
    };

    res.send(json);
});

router.get('/friends/:friend_id', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            username: `UserName${req.params.user_id}`,
            name: `Name${req.params.user_id}@mail.com`,
            mail: `Mail${req.params.user_id}@mail.com`,
        },
    };
    res.send(json);
});

router.post('/friends/', (req, res) => {
    console.log(req.body);
    const json = {
        response: 'ok',
        data: {
            user_id: 100,
            name: req.body.name,
        },
    };
    res.send(json);
});

router.delete('/friends/:friend_id', (req, res) => {
    res.send(`${req.params.username} : ${req.params.user_id} deleted`);
});

// REGISTER
router.get('/', (req, res) => {
    res.send('registering');
});


router.post('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
        },
    };
    res.send(json);
});

module.exports = router;
