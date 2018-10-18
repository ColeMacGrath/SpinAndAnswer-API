const { Router } = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./users');
const questionRouter = require('./questions');
const authRouter = require('./auth');
const gameRouter = require('./game');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Hello World!'));

router.use('/users', usersRouter);
router.use('/questions', questionRouter);
router.use('/auth', authRouter);
router.use('/game', gameRouter);

module.exports = router;
