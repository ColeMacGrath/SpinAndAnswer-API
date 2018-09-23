const { Router } = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./users');
const questionRouter = require('./questions');
const loginRouter = require('./login');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Hello World!'));

router.use('/users', /*[midd]*/usersRouter);
router.use('/questions', /*[midd]*/questionRouter);
router.use('/login', /*[midd]*/loginRouter);

module.exports = router;
