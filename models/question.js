const database = require('../database');

//A structure for a question
class Question {
    constructor(id, category, question, correctAnswer, answerOne, answerTwo, answerThree, active) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answerOne = answerOne;
        this.answerTwo = answerTwo;
        this.answerThree = answerThree;
        this.active = active;
    }

    /**
     * Gets every question asking to datbase for them
     * @return {Promise} [return an array of Questions (Object)]
     */
    static async getAll() {
        const data = await database.selectAll('questions');
        const response = [];
        data.forEach((r) => {
            response.push(new Question(r));
        });
        return response;
    }

    /**
     * Get a single question
     * @param  {[Int]}  questionId [ID of question to consult]
     * @return {Promise}            [return a JSON data with question information]
     */
    static async get(questionId) {
        const data = await database.singleSelect('questions', questionId);
        return data;
    }

    /**
     * Creates a new Questions object and insert it into database
     * @param  {[Int]}  category       [Category (topic) of question in Int format]
     * @param  {[String]}  question       [String with the question]
     * @param  {[String]}  correct_answer [String with the correct question]
     * @param  {[String]}  answer_one     [String with an incorrect question]
     * @param  {[String]}  answer_two     [String with an incorrect question]
     * @param  {[String]}  answer_three   [String with an incorrect question]
     * @return {Promise}                [Return a Question object and insert it into database
     */
    static async create({category, question, correct_answer, answer_one, answer_two, answer_three}){
      let response = await database.insert('questions', {category, question, correct_answer, answer_one, answer_two, answer_three});

      const id = response.insertId;
      if (id > 0){
        return new Question({id, category, question, correct_answer, answer_one, answer_two, answer_three});
      }
      return [];
    }

    /**
     * Changes status of question (active or inactive)
     * @param  {[Int]}  questionId [ID of question to change stats]
     * @return {Promise}            [Return modified data]
     */
    static async changeActive(questionId) {
        const data = await database.changeActive('questions', questionId);
        return data;
    }

    /**
     * Changes category of specific question
     * @param  {[Int]}  questionId [ID of question to be modified]
     * @param  {[Int]}  category   [New category for question]
     * @return {Promise}            [return data modified]
     */
    static async changeCategory(questionId, category) {
        const data = await database.changeCategory('questions', questionId, category);
        return data;
    }

    /**
     * Modifies every part of a question and update it in datbase
     * @param  {[Int]}  questionId     [ID of question to be modified]
     * @param  {[Int]}  category       [new category for question]
     * @param  {[String]}  question       [new category for question]
     * @param  {[String]}  correct_answer [new data for correct_answer]
     * @param  {[String]}  answer_one     [new data for answer_one]
     * @param  {[String]}  answer_two     [new data for answer_two]
     * @param  {[String]}  answer_three   [new data for answer_three]
     * @return {Promise}                [return modified object]
     */
    static async modify(questionId, {category, question, correct_answer, answer_one, answer_two, answer_three}) {
        const data = await database.update('questions', questionId, {category, question, correct_answer, answer_one, answer_two, answer_three} );
        return data;
    }
}

module.exports = Question;
