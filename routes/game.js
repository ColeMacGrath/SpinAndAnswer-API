const router = require('express').Router();
const { gameCtrl } = require('../Controllers');
const { auth } = require('../middlewares');
const middleware = require('../middlewares');

// Create a game with the players' id
router.post('/choose', [auth.haveSession, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       userId: 'number',
	     rivalId: 'number',
     },
   });
 }], gameCtrl.createGame);

// Give the questions to the players
router.get('/play/:gameId', auth.haveSession, gameCtrl.showGame);

// Obtain the answer of the player
router.post('/:gameId', [auth.haveSession, (req, res, next) => {
   middleware.validator.validate(req, res, next, {
     body: {
       gameId: 'number',
	     questionId: 'number',
       answer: 'word',
     },
   });
 }], gameCtrl.answerQuestion);

// Show all the questions
router.get('/all', [auth.haveSession, auth.havePermissions], gameCtrl.getAll);

// Give all the questions by category
router.get('/:categoryId', auth.haveSession, gameCtrl.getQuestionsOf);

// Show the results of the game
router.get('/results/:gameId', auth.haveSession, gameCtrl.results);

module.exports = router;
