const database = require('../database');

class UsersController {
    constructor() {
        database.query();
        this.getAll = this.getAll.bind(this);
    }

    getAll(req, res) {
        const json = {
            data: this.users,
            total_count: this.users.length,
        };

        res.send(json);
    }
}

module.exports = new UsersController();
