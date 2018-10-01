const { Question } = require('../models');

class QuestionCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
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
  }

module.exports = new QuestionCtrl();
