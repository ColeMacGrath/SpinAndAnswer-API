//users
exports.getAllUsers = (req, res, next) => {
  const users = {
    id: 0,
    name: 'Initial Name',
    email: 'mail',
    username: 'username',
    password: 'password',
  };

  const json = {
    response: 'ok',
    data: users,
    total: 1,
  };

  res.send(json);
}

exports.getUser = (req, res, next) => {
  const user = {
    id: 0,
    name: 'Initial Name',
    email: 'mail',
    username: 'username',
    password: 'password',
  };

  const json = {
    response: 'ok',
    data: user,
  };

  res.send(json);
}

exports.changeUserData = (req, res, next) => {
  const user = {
    id: 0,
    name: 'Initial Name',
    email: 'mail',
    username: 'username',
    password: 'password',
  };

  const json = {
    response: 'ok',
    data: user,
  };

  res.send(json);
}
