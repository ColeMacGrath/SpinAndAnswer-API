const { Question } = require('../models');

class QuestionCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
    }

    async getAll(req, res) {
      let data = await Question.getAll();

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
      let data = await Question.get(req.params.questionId);
      if (data.length === 0) {
          res.status(404);
      }

      res.send(data);
    }

    async create(req, res, next) {
      let data = await Question.create(req.body);
      res.status(201).send(data);
    }

    async changeActive(req, res) {
      let data = await Question.changeActive(req.params.questionId);
      if (data.changedRows === 0) {
        res.status(404);
      }
      res.send(data);
    }
}

module.exports = new QuestionCtrl();
