const { Router } = require('express');

const router = Router();
const registerMiddleWare = require('../middlewares');

router.get('/', (req, res) => {
    res.send('registering');
});

// register
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
