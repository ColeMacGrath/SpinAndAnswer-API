const { Router } = require('express');
const router = Router();
const gameMiddleware = require('../middlewares');

router.get('/', (req, res) => {
  res.send('playing');
});

//Inicio de juego
router.post('/', (req, res) => {
  const json = {
    response: 'ok',
    data: {
        playPressed: 0
    },
  };
  res.send(json);
});

//respuesta
router.post('/', (req, res) => {
  const json = {
    response: 'ok',
    data: {
        question_id: 0,
        answer_id: 0
    },
  };
  res.send(json);
});

//Play with others
router.post('/', gameMiddleware.emptyAddData, (req, res) => {
  const json = {
    response: 'Ok',
    data: {
      friend_id: 0,
      friend_username: 'username',
    },
  }
  res.send(json);
});

module.exports = router;
