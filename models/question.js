const database = require('../database');

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

    static async getAll() {
        const data = await database.selectAll('questions');
        const response = [];
        data.forEach((r) => {
            response.push(new Question(r));
        });
        return response;
    }

    static async get(questionId) {
        const data = await database.singleSelect('questions', questionId);
        return data;
    }

    static async create({ category, question, correct_answer, answerOne, answerTwo, answerThree }) {
        const response = await database.insert('questions', { category, question, correct_answer, answerOne, answerTwo, answerThree });
        const id = response.insertId;
        if (id >  0) {
            return new Question({ id, category, question, correct_answer, answerOne, answerTwo, answerThree }) ;
        }
        return [];
    }
}

module.exports = Question;
