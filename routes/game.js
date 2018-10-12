const router = require('express').Router();
const { gameCtrl } = require('../Controllers');
const userMiddleware = require('../middlewares');

// Create a game with the players' id
router.post('/choose', gameCtrl.createGame);

// Give the questions to the players
router.get('/play/:gameId', gameCtrl.showGame);

// Obtain the answer of the player
router.post('/:gameId', gameCtrl.answerQuestion);

// Show all the questions
router.get('/all', gameCtrl.getAll);

// Give all the questions by category
router.get('/:categoryId', gameCtrl.getQuestionsOf);

// Show the results of the game
router.get('/results/:gameId', gameCtrl.results);

module.exports = router;
