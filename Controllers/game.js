const { Game } = require('../models');

class GameCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    async getAll(req, res) {
      let data = await Game.getAll();

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

    async getQuestions(req, res) {
      let data = await Game.getQuestions(req.body.from, req.body.to);
      const json = {
        data: data,
        total_count: data.lenght,
      };

      if (data.length === 0) {
        res.status(204);
      }

      res.send(json);
    }

    async getQuestionsOf(req, res) {
      let data = await Game.getQuestionsOf(req.params.categoryId);
      const json = {
        data: data,
        total_count: data.lenght,
      }

      if (data.length === 0) {
        res.status(204);
      }

      res.send(json);
    }
}

module.exports = new GameCtrl();
