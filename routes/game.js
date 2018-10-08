const router = require('express').Router();
const { gameCtrl } = require('../controllers');
const userMiddleware = require('../middlewares');

//Se crea el juego con los ID de jugadores
router.post('/choose', gameCtrl.createGame);
//Se entrega la pregunta al jugador
router.get('/:gameId', gameCtrl.showGame);
//Se obtiene la respuesta del jugador
router.post('/:gameId', gameCtrl.answerQuestion);
//Se muestran todas las preguntas
router.get('/all', gameCtrl.getAll);
//Se entregan todas las preguntas por categoría
router.get('/:categoryId', gameCtrl.getQuestionsOf);
//Resultados de la partida
router.get('/results/:gameId', gameCtrl.results);

module.exports = router;
