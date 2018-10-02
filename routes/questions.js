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
router.put('/:questionId', questionCtrl.modify);

module.exports = router;
