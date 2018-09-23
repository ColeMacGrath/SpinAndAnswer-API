const { Router } = require('express');

const router = Router();
router.get('/', (req, res) => {
    const questions = [
        {
            question_id: 1,
            question: 'Question',
            answers: {},
        },
    ];
    const json = {
        response: 'Ok',
        data: questions,
        total: 2,
    };

    res.send(json);
});

router.get('/:question_id', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            question_id: req.params.question_id,
            question: `Question${req.params.question_id}`,
            answers: {},
        },
    };
    res.send(json);
});

router.post('/', (req, res) => {
    console.log(req.body);
    const json = {
        response: 'ok',
        data: {
            question_id: 100,
            question: 'Question',
            answers: {},
        },
    };
    res.send(json);
});

router.put('/:question_id', (req, res) => {
    res.send('editado');
});

router.delete('/question_id', (req, res) => {
    res.send(`${req.params.question_id} deleted`);
});

module.exports = router;
