const { Question } = require('../models');

class QuestionCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.modify = this.modify.bind(this);
    }

    /**
     * Gets every question in JSON format
     * @param   request   req Input
     * @param   response  res Response
     * @return  Promise   Return a JSON with info
     */
    async getAll(req, res) {
      let data = await Question.getAll();

      const json = {
            data: data,
            total_count: data.length,
      };

      if (data.length === 0) {
            res.status(404).send('Questions not found');
      }

      res.status(200).send(json);
    }

    /**
     * Get a single question
     * @param   request   req Input (ID of question)
     * @param   response  res Response
     * @return  Promise   Return a single question, if doesnt existis return a 404 status error
     */
    async get(req, res) {
      let data = await Question.get(req.params.questionId);
      if (data.length === 0) {
          res.status(404).send('Question not found');
      }

      res.status(200).send(data);
    }

    /**
     * Creates new question
     * @param   request    req  Input (Question Info)
     * @param   response   res  Response
     * @return  Promise    Return data with a 201 message
     */
    async create(req, res, next) {
      let data = await Question.create(req.body);
      if (data){
        res.status(201).send('Question created');
      }
      res.status(400).send('Question not created')
    }

    /**
     * Changes status of question (aproved of rejected)
     * @param   request   req Input (ID of question)
     * @param   response  res Response
     * @return  Promise   Return a 200 status if was changed, 404 if it was not located
     */
    async changeActive(req, res) {
      let data = await Question.changeActive(req.params.questionId);
      if (data.changedRows === 0) {
        res.status(404).send('Question not found');
      }
      res.status(200).send('Status changed');
    }

    /**
     * Changes category of a specific question
     * @param   request   req Input
     * @param   response  res Reponse
     * @return  Promise   Return a 404 status if category wasn't changed, if not return question data
     */
    async changeCategory(req, res) {
      let data = await Question.changeCategory(req.params.questionId, req.body.category);
      if (data.length === 0) {
        res.status(404).send('Could not change category');
      }
      res.status(200).send('Category changed');
    }

    /**
     * Modifies every single parameter of question
     * @param   request   req  Input (Question ID and question Information)
     * @param   response  res  Response
     * @return  Promise   return 404 status if questions wasnt located, if was located return question data
     */
    async modify(req, res, next) {
      let data = await Question.modify(req.params.questionId, req.body);
        if (data.affectedRows === 0) {
          res.status(404).send('Could not modify question');
        }
        res.status(200).send('Question modified');
    }
}

module.exports = new QuestionCtrl();
