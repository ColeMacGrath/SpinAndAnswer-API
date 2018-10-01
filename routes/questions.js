const router = require('express').Router();
const { questionCtrl } = require('../controllers');
const questionMiddleWare = require('../middlewares');

router.get('/', questionCtrl.getAll);

router.get('/:questionId', questionCtrl.get);

router.post('/', questionCtrl.create);

// Question approval
router.patch('/:questionId', questionCtrl.changeActive);

router.patch('/change/:questionId', questionCtrl.changeCategory);


// Edit question
router.put('/:question_id', (req, res) => {
    res.send('editado');
});
// delete question
router.delete('/question_id', (req, res) => {
    res.send(`${req.params.question_id} deleted`);
});

module.exports = router;
