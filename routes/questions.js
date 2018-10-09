const router = require('express').Router();
const { questionCtrl } = require('../controllers');
const questionMiddleWare = require('../middlewares');

// Obtain all the approved questions
router.get('/', questionCtrl.getAll);

// Obtain the information of a specific question by its Id
router.get('/:questionId', questionCtrl.get);

// Add a new question
router.post('/', questionCtrl.create);

// Approve a question or delete it logically
router.patch('/:questionId', questionCtrl.changeActive);

// Modify the category from a specific question
router.patch('/change/:questionId', questionCtrl.changeCategory);

// Modify the whole question resource
router.put('/:questionId', questionCtrl.modify);

module.exports = router;
