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


router.get('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            question_id: 0,
            question: 'Question Hola Mundo',
            answers: [{}],
        },
    };
    res.send(json);
});

router.post('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            oponent: req.body.answer,
        },
    };
    res.send(json);
});

// Question approval
router.patch('/', (req, res) => {
    const json = {
        response: 'ok',
        data: {
            status: true,
        },
    };
    res.send(json);
});

// Edit question
router.put('/:question_id', (req, res) => {
    res.send('editado');
});
// delete question
router.delete('/question_id', (req, res) => {
    res.send(`${req.params.question_id} deleted`);
});

module.exports = router;
