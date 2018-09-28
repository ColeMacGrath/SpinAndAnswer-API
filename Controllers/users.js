const { User } = require('../models');

class UserCtrl {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    let data = await User.getAll();

    const json = {
      data: data,
      total_count: data.length,
    };

    // In case user was not found
    if (data.length === 0) {
      res.status(204);
    }

    res.send(json);
  }

  async get(req, res) {
    let data = await User.get(req.params.userId);
    if (data.length === 0) {
      res.status(404);
    }

    res.send(data);
  }

  async deleteUser(req, res) {
    let data = await User.remove(req.params.userId);
    if (data.length === 0) {
      res.status(404);
    }
  }

  create(req, res) {
    const data = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    this.data.push(data);

    res.status(201).send(data);
  }

  delete(req, res) {
    const index = this.data.findIndex(el => el.id === Number(req.params.userId));
    this.data.splice(index, 1);
    res.send();
  }
}

module.exports = new UserCtrl();
