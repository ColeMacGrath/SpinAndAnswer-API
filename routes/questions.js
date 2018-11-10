const router = require('express').Router();
const { questionCtrl } = require('../controllers');
const middleware = require('../middlewares');
const { auth } = require('../middlewares');

// Obtain all the approved questions
router.get('/', [auth.haveSession, auth.havePermissions], questionCtrl.getAll);

// Obtain the information of a specific question by its Id
router.get('/:questionId', [auth.haveSession, auth.havePermissions], questionCtrl.get);

// Add a new question
router.post('/', [auth.haveSession, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       category: 'number',
	     question: 'word,required',
	     correct_answer: 'word,required',
	     answer_one: 'word,required',
	     answer_two: 'word,required',
	     answer_three: 'word,required',
	     question_user_id: 'number',
     },
   });
 }], questionCtrl.create);

// Approve a question or delete it logically
router.patch('/:questionId', [auth.haveSession, auth.havePermissions, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       questionId: 'number',
     },
   });
 }], questionCtrl.changeActive);

// Modify the category from a specific question
router.patch('/change/:questionId', [auth.haveSession, auth.havePermissions, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       category: 'number',
     },
   });
 }], questionCtrl.changeCategory);

// Modify the whole question resource
router.put('/:questionId', [auth.haveSession, auth.havePermissions, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       category: 'number',
	     question: 'word,required',
	     correct_answer: 'word,required',
	     answer_one: 'word,required',
	     answer_two: 'word,required',
	     answer_three: 'word,required',
     },
   });
 }], questionCtrl.modify);

module.exports = router;
