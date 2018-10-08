const { User } = require('../models');

class UserCtrl {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.changeActive.bind(this);
        this.modify = this.modify.bind(this);
        this.getAllFriends = this.getAllFriends.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.modifyFriendship = this.modifyFriendship.bind(this);
        this.acceptFriend = this.acceptFriend.bind(this);
    }

    async getAll(req, res) {
      let data = await User.getAll();

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

    async get(req, res) {
      let data = await User.get(req.params.userId);
      if (data.length === 0) {
        res.status(404);
      }

      res.send(data);
    }

    async getAllFriends(req, res) {
      let data = await User.selectAllFriends(req.params.userId);
      const json = {
        data: data,
        total_count: data.length,
      };

      // In case user was not found
      if (data.length === 0) {
        res.status(404);
      }

      res.send(json);
    }

    //Logical delete
    async changeActive(req, res) {
      let data = await User.changeActive(req.params.userId);
      if (data.changedRows === 0) {
        res.status(404);
      }
      res.send(data);
    }

    async create(req, res, next) {
      let data = await User.create(req.body);
      res.status(201).send(data);
    }

    async modify(req, res, next) {
      let data = await User.modify(req.params.userId, req.body);
      res.status(201).send(data);
    }

    async modifyFriendship(req, res) {
      let data = await User.modifyFriendship(req.params.userId, req.body.friendId);
      console.log(data.affectedRows);
      if (!data.affectedRows) {
        res.status(404).send(data);
      }
      res.status(201).send(data);
    }

    async addFriend(req, res, next) {
      let friend = await User.get(req.body.friendId);
       if (friend[0].active) {
         let data = await User.addFriend(req.body.userId, req.body.friendId);
         if (data.length === 0) {
           res.status(404).send(data);
         } else {
           res.status(201).send(data);
         }
       } else {
         res.status(404).send('User not found');
       }
    }

    async acceptFriend(req, res, next) {
      let data = await User.modifyFriendship(req.body.userId, req.body.friendId);
      if (!data.affectedRows) {
        res.status(404).send(data);
      }
      res.status(201).send(data);
    }
}

module.exports = new UserCtrl();
