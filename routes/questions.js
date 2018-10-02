const router = require('express').Router();
const { questionCtrl } = require('../controllers');
const questionMiddleWare = require('../middlewares');

router.get('/', questionCtrl.getAll);

router.get('/:questionId', questionCtrl.get);

router.post('/', questionCtrl.create);

router.post('/', (req, res, next) => {
    questionMiddleWare.validator.validate(req, res, next, {
        body: {
            category: 'required',
            question: 'word,required',
            correct_answer: 'word,required',
            answerOne: 'word,required',
            answerTwo: 'word,required',
            answerThree: 'word,required',
        },
    });
}, questionCtrl.create);


// Question approval
router.patch('/:questionId', questionCtrl.changeActive);

router.patch('/change/:questionId', questionCtrl.changeCategory);

// Edit question
router.put('/:questionId', questionCtrl.modify);

module.exports = router;
