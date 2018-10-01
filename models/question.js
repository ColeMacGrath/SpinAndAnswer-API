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
}

module.exports = Question;
