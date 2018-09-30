const { User } = require('../models');

class UserCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.changeActive.bind(this);
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

    //Logical delete
    async changeActive(req, res) {
      let data = await User.changeActive(req.params.userId);
      if (data.lenght === 0) {
        res.status(404);
      }
      res.send(data);
    }

    async create(req, res, next) {
      let data = await User.create(req.body);
      res.status(201).send(data);
    }
}

module.exports = new UserCtrl();
