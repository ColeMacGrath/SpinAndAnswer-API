const { Router } = require('express');

const router = Router();

router.get('/: category_id', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            category_id: req.params.category_id,
            category_name: req.params.category_name,
        },
    };
    res.send(json);
});

router.post('/', (req, res) => {
    const json = {
        response: 'Ok',
        data: {
            category_id: 0,
            category_name: req.body.category,
        },
    };
    res.send(json);
});

module.exports = router;
