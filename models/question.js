const database = require('../database');

//A structure for a question
class Question {
    constructor(id, category, question, correctAnswer, answerOne, answerTwo, answerThree, active, userId) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answerOne = answerOne;
        this.answerTwo = answerTwo;
        this.answerThree = answerThree;
        this.active = active;
        this.userId = userId;
    }

    /**
     * Gets every question asking to datbase for them
     * @return Promise [return an array of Questions (Object)]
     */
    static async getAll() {
      try {
        const data = await database.selectAll('questions');
        const response = [];
        data.forEach((r) => {
          response.push(new Question(r));
        });
        return response;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get a single question
     * @param   Integer   questionId [ID of question to consult]
     * @return Promise            [return a JSON data with question information]
     */
    static async get(questionId) {
      try {
        const data = await database.singleSelect('questions', questionId);
        return data.length !== 0 ? new Question(data) : data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Creates a new Questions object and insert it into database
     * @param   Integer   category       [Category (topic) of question in Int format]
     * @param   String   question       [String with the question]
     * @param   String   correct_answer [String with the correct question]
     * @param   String   answer_one     [String with an incorrect question]
     * @param   String   answer_two     [String with an incorrect question]
     * @param   String   answer_three   [String with an incorrect question]
     * @return Promise                [Return a Question object and insert it into database
     */
    static async create({category, question, correct_answer, answer_one, answer_two, answer_three, question_user_id}){
      try {
        let response = await database.insert('questions', {category, question, correct_answer, answer_one, answer_two, answer_three, question_user_id});
        const id = response.insertId;
        if (id > 0){
          return new Question({id, category, question, correct_answer, answer_one, answer_two, answer_three, question_user_id});
        }
        return [];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Changes status of question (active or inactive)
     * @param   Integer   questionId [ID of question to change stats]
     * @return Promise            [Return modified data]
     */
    static async changeActive(questionId) {
      try {
        const data = await database.changeActive('questions', questionId);
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Changes category of specific question
     * @param   Integer   questionId [ID of question to be modified]
     * @param   Integer   category   [New category for question]
     * @return Promise            [return data modified]
     */
    static async changeCategory(questionId, category) {
      try {
        const data = await database.changeCategory('questions', questionId, category);
        const question = await database.singleSelect('questions', questionId);
        if (question[0].active){
          return data;
        }
        return [];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Modifies every part of a question and update it in datbase
     * @param   Integer   questionId     [ID of question to be modified]
     * @param   Integer   category       [new category for question]
     * @param   String   question       [new category for question]
     * @param   String   correct_answer [new data for correct_answer]
     * @param   String   answer_one     [new data for answer_one]
     * @param   String   answer_two     [new data for answer_two]
     * @param   String   answer_three   [new data for answer_three]
     * @return Promise                [return modified object]
     */
    static async modify(questionId, {category, question, correct_answer, answer_one, answer_two, answer_three}) {
      try {
        const data = await database.update('questions', questionId, {category, question, correct_answer, answer_one, answer_two, answer_three} );
        return data;
      } catch (e) {
        throw e;
      }
    }
}

module.exports = Question;
