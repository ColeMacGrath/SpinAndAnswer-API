const { Game } = require('../models');
var express = require('express');
var router = express.Router();

class GameCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.getQuestionsOf = this.getQuestionsOf.bind(this);
        this.showGame = this.showGame.bind(this);
        this.answerQuestion = this.answerQuestion.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    async getAll(req, res) {
      let data = await Game.getAllGames();

      const json = {
        data: data,
        total_count: data.length,
      };

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

    async showGame(req, res) {
      let gameId = req.params.gameId;
      let category = await Game.getCategory(gameId);
      let questions = await Game.getQuestionsOf(category);
      let randomQuestion = Math.floor(Math.random() * questions.length);

      const json = {
        question: questions[randomQuestion],
      };

      res.send(json);
    }

    async answerQuestion(req, res) {
      let require = Object.assign({}, req);
      let response = Object.assign({}, res);
      let gameId = req.params.gameId;
      let question = await Game.getAnswer(req.body.questionId, req.body.answer);
      let userId = await Game.getIdOf('game_user_id', gameId);
      let rivalId = await Game.getIdOf('rival_id', gameId);
      var turn = await Game.getTurn(gameId);
      if (turn < 10) {
        if (question) {
          if ( turn % 2 == 0) {
            Game.updatePoints(gameId, userId, 10);
          } else {
            Game.updatePoints(gameId, rivalId, 10);
          }
        }
        await Game.sumTurn(gameId);
      } else {
        res.redirect(`results/${gameId}`);
      }
      res.redirect(`${gameId}`);
    }

    async createGame(req, res) {
      if (await Game.exists(req.body.userId, req.body.rivalId)) {
        if (!(req.body.userId == req.body.rivalId)) {
          var max = await Game.getMax('category', 'questions');
          const maxValue = Object.values(max[0]);
          var random = Math.floor(Math.random() * maxValue) + 1;
          let game = await Game.createGame(req.body.userId, req.body.rivalId, random);
          let gameId = Object.values(game[0]);
          res.redirect(`${gameId}`);
        } else {
          res.status(400).send('Cannot play with yourself, go and make friends');
        }
      } else {
        res.status(404).send('User not found');
      }
    }

    async results(req, res) {
      let game = await Game.get(req.params.gameId);
      res.send(game);
    }
}

module.exports = new GameCtrl();
