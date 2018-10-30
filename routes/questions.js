const router = require('express').Router();
const { questionCtrl } = require('../Controllers');
const { auth } = require('../middlewares');

// Obtain all the approved questions
router.get('/', [auth.haveSession, auth.havePermissions], questionCtrl.getAll);

// Obtain the information of a specific question by its Id
router.get('/:questionId', [auth.haveSession, auth.havePermissions], questionCtrl.get);

// Add a new question
router.post('/', auth.haveSession, questionCtrl.create);

// Approve a question or delete it logically
router.patch('/:questionId', [auth.haveSession, auth.havePermissions], questionCtrl.changeActive);

// Modify the category from a specific question
router.patch('/change/:questionId', [auth.haveSession, auth.havePermissions], questionCtrl.changeCategory);

// Modify the whole question resource
router.put('/:questionId', [auth.haveSession, auth.havePermissions], questionCtrl.modify);

module.exports = router;
