const { Router } = require('express');

const router = Router();
const gameMiddleware = require('../middlewares');

router.get('/', (req, res) => {
    res.send('preguntas');
});

// categoria
router.get('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            category: 0,
        },
    };
    res.send(json);
});

// respuesta
router.post('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            answer: req.body.answer,
        },
    };
    res.send(json);
});

module.exports = router;
