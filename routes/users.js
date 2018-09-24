const { Router } = require('express');

const router = Router();

const { usersController } = require('../controllers');

router.get('/', usersController.getAll);

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

router.post('/', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            user_id: 0,
            username: req.body.username,
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password,
        },
    };
    console.log(json);
    res.send(json);
});

router.put('/:user_id', (req, res) => {
    res.send('editado');
});

router.delete('/user_id', (req, res) => {
    res.send(`${req.params.username} : ${req.params.user_id} deleted`);
});

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

router.post('/friends/', /* friendsMiddleWare.checkIntegrity */ (req, res) => {
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

router.delete('/user_id', (req, res) => {
    res.send(`${req.params.username} : ${req.params.user_id} deleted`);
});

module.exports = router;
