const { Router } = require('express');

const usersRouter = require('./users');
const questionRouter = require('./questions');
const loginRouter = require('./login');
const gameRouter = require('./game');

const router = Router();

router.get('/', (req, res) => res.send('Bienvenido a SpinAndAnswer!'));

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/login', loginRouter);
router.use('/game', gameRouter);

module.exports = router;
