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

    /**
     * Request every game in database
     * @param  {request}  req [Input]
     * @param  {response}  res [Response]
     * @return {Promise}     [Return a JSON with all games]
     */
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

    /**
     * [Get every question in database]
     * @param  {request}  req [Input]
     * @param  {response}  res [Response]
     * @return {Promise}     [return a JSON with all questions]
     */
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

    /**
     * Get every question with same category
     * @param  {request}  req [Input (ID of category)]
     * @param  {response}  res [Response]
     * @return {Promise}     [return a JSON with all questions of same category]
     */
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

    /**
     * Show a random question in game
     * @param  {request}  req [Input (ID of game)]
     * @param  {response}  res [response]
     * @return {Promise}     [return a JSON with a random question]
     */
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

    /**
     * Get, determine and update information when a question is answered
     * @param  {request}  req [Input (ID of question and answer in string)]
     * @param  {response}  res [Response]
     * @return {Promise}     [Redirect for another question]
     */
    async answerQuestion(req, res) {
      let require = Object.assign({}, req);
      let response = Object.assign({}, res);
      //ID of game
      let gameId = req.params.gameId;
      //Determine if question is correct
      let question = await Game.getAnswer(req.body.questionId, req.body.answer);
      //Get the object of user who's playing
      let userId = await Game.getIdOf('game_user_id', gameId);
      //Get the object of user who's playing against
      let rivalId = await Game.getIdOf('rival_id', gameId);
      //Get the actual turn in database
      var turn = await Game.getTurn(gameId);
      //Every game is supposed to be of ten turns
      if (turn < 10) {
          //Check if answer is correct
        if (question) {
          //If turn is par firstUser answered
          if ( turn % 2 == 0) {
            Game.updatePoints(gameId, userId, 10);
            //If is odd rival answered
          } else {
            Game.updatePoints(gameId, rivalId, 10);
          }
        }
        //Sum a turn
        await Game.sumTurn(gameId);
      } else {
        //If turn is more than ten redirects to results screen
        res.redirect(`results/${gameId}`);
      }
      //Return to game and show other question
      res.redirect(`${gameId}`);
    }

    /**
     * Creates a new game in database
     * @param  {request}  req [Input (ID of user and ID of rival)]
     * @param  {response}  res [respobse]
     * @return {Promise}     [Send status according to the situation]
     */
    async createGame(req, res) {
      //If both users exists creates a new game
      if (await Game.exists(req.body.userId, req.body.rivalId)) {
        //If users are different game can be created
        if (!(req.body.userId == req.body.rivalId)) {
          //Gets maximum of questions in a category
          var max = await Game.getMax('category', 'questions');
          const maxValue = Object.values(max[0]);
          //Do a random for question
          var random = Math.floor(Math.random() * maxValue) + 1;
          //Creates a geme with both users and a random caegory
          let game = await Game.createGame(req.body.userId, req.body.rivalId, random);
          let gameId = Object.values(game[0]);
          //Redirects to a game screen
          res.redirect(`${gameId}`);
        } else {
          //If both users are the same
          res.status(400).send('Cannot play with yourself, go and make friends');
        }
      } else {
        //If one or both users are not registered
        res.status(404).send('User not found');
      }
    }

    /**
     * Gets results of a specific game
     * @param  {request}  req [Input (ID of game)]
     * @param  {response}  res [response]
     * @return {Promise}     [return a game info]
     */
    async results(req, res) {
      let game = await Game.get(req.params.gameId);
      res.send(game);
    }
}

module.exports = new GameCtrl();
