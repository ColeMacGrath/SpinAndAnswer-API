const { Router } = require('express');

const middleWares = require('../middleware');
const router = Router();

/** USERS **/
//Get all users
router.get('/', middleWares.getAllUsers);
//Get a single user
//router.get('/', middleWares.getUser);
//Change userData
//router.put('/', middleWares.changeUserData);
//router.put('/', middleWares.deleteUser);

/** ADMIN **/
//router.put('/', middleWares.checkAnsewers);
//router.put('/', middleWares.editQuestion);
//router.put('/', middleWares.addQuestion);
//router.put('/', middleWares.deleteQuestion);

/** FRIENDS **/
//router.get('/', middleWares.getFriends);
//router.get('/', middleWares.addFriend);

/** REGISTER **/
//router.post('/', middleWares.register);

/** LOGIN **/
//router.get('/', middleWares.login);

/** SEND Question **/
//router.get('/', middleWares.sendQuestion);

/** Panel de administrador **/
//Aprove Question

/** IN GAME **/
//router.get('/', middleWares.startGame);

router.get('/game/:gameId', (req, res) => {
  const questions = [
    {
      id: 1,
      question: 'First Question',
      answers: Date(),
    },
    {
      id: 2,
      name: 'juan2',
      answers: Date(),
    },
  ];

  const json = {
    response: 'ok',
    data: questions,
    total: 2,
  };

  res.send(json);
});

//Get answer
router.post('/game/:gameId', (req, res) => {
  const answer = {
    id: 1,
    answer: 1,
  };

  const json = {
    response: 'ok',
    data: answer,
    total: 1,
  };

  res.send(json);
});


router.put('/admin/check', (req, res) => {
  const user = {
      id: 1,
      quesition: 'Question',
      asnwers: ['0'],
      aproved: true,
  };
  res.send(user);
});
//Edit question
router.put('/admin/check', (req, res) => {
  const user = {
      id: 1,
      quesition: 'Question Edited',
      asnwers: ['1'],
      aproved: true,
  };
  res.send(user);
});

/** Administración de amigos **/
//Get all friends
router.get('/:userId/friends', (req, res) => {
  const friends = [
    {
      id: 1,
      name: 'firstFriend',
      email: 'email',
    },
    {
      id: 2,
      name: 'secondFriend',
      email: 'email',
    },
  ];

  const json = {
    response: 'ok',
    data: friends,
    total: 2,
  };

  res.send(json);
});

//Add new Friend
router.post('/:userId/addFriend', (req, res) => {
  const friend = {
    id: 1,
    name: 'friendName',
    email: 'email',
  }
  const json = {
    response: 'ok',
    data: friend,
  };
  res.send(json);
});

/** Registro **/
//new user added
router.post('/register', (req, res) => {
  const newUser = [
    {
      id: 1,
      name: 'firstFriend',
      nickName: 'nickName',
      email: 'email',
    },
  ];

  const json = {
    response: 'ok',
    data: newUser,
    total: 2,
  };
  res.send(json);
});

/** Login **/
router.get('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'juan',
    email: 'juan@correo',
  };
  res.send(user);
})

/** Envío de pregunta **/
router.post('/addQuestion', (req, res) => {
  const question = [
    {
      id: 1,
      quesition: 'Question',
      asnwers: [],
      aproved: false,
    },
  ];

  const json = {
    response: 'ok',
    data: question,
    total: 1,
  };
  res.send(json);
});

module.exports = router;
