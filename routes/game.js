const router = require('express').Router();
const { gameCtrl } = require('../controllers');
const userMiddleware = require('../middlewares');

//Al inicio del juego se obtendrá un random para la categoría
//Mostrar por categoría(getQuestionsOf)
//Obtener las preguntas de n a n (getQuestions)
//Mostrar todas la preguntas (getAll)
//Tomar la respuesta del usuario y comprobarla, sumar, etc

router.get('/', gameCtrl.showGame);
router.get('/all', gameCtrl.getAll);
router.post('/', gameCtrl.answerQuestion);
router.get('/:categoryId', gameCtrl.getQuestionsOf);
module.exports = router;
