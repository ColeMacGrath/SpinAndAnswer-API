module.exports = function getAll(req, res) {
  const users = {
    id: 0,
    name: 'Initial Name',
    email: 'mail',
    username: 'username',
    password: 'passw',
  },

  const json = {
    response: 'ok',
    data: users,
    total: 1,
  };

  res.send(json);
};