const { Router } = require('express');

const router = Router();
const registerMiddleWare = require('../middlewares');

router.get('/', (req, res) => {
    res.send('registering');
});

// register
router.post('/', [registerMiddleWare.checkEmail,
    registerMiddleWare.emptyUserData], (req, res) => {
    const json = {
        response: 'ok',
        data: {
            userName: 'userName',
            password: 'password',
            name: 'name',
            emai: 'email',
        },
    };
    res.send(json);
});

module.exports = router;
