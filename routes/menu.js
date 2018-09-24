const { Router } = require('express');

const router = Router();
const gameMiddleware = require('../middlewares');

router.get('/', (req, res) => {
    res.send('menu');
});

// Inicio de juego
router.post('/start', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            playPressed: req.body.option,
        },
    };
    res.send(json);
});

// Play with others
router.post('/multiplayer', gameMiddleware.emptyAddData, (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            friend_username: req.body.username,
        },
    };
    res.send(json);
});

// Tipo de juego
router.post('/type', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            oponent: req.body.oponent,
        },
    };
    res.send(json);
});

module.exports = router;
