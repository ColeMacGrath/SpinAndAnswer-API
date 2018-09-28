const { Router } = require('express');

const router = Router();
const loginMiddleWare = require('../middlewares');

router.get('/', (req, res) => {
    res.send('logging in');
});

router.post('/', /* loginMiddleWare.emptyUserData, */ (req, res) => {
    console.log(req.body);
    const json = {
        response: 'Ok',
        data: {
            userName: req.body.username,
            password: req.body.password,
        },
    };
    res.send(json);
});

module.exports = router;
