const { Router } = require('express');
const router = Router();

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
});

//Play with others
router.post('/', /*game.checkIntegrity*/(req, res) => {
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
