const { Question } = require('../models');

class QuestionCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
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
  }

module.exports = new QuestionCtrl();
