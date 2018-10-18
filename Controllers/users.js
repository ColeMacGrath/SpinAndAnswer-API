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

    /**
     * Gets every users in database
     * @param  {request}  req [Input]
     * @param  {response}  res [Response a JSON with users]
     * @return {Promise}     [return every user in JSON]
     */
    async getAll(req, res) {
      let data = await User.getAll();

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
     * Gets a single user
     * @param  {request}  req [Input (ID of user)]
     * @param  {response}  res [send a user in JSON]
     * @return {Promise}     [return a user in JSON]
     */
    async get(req, res) {
      let data = await User.get(req.params.userId);
      if (data.length === 0) {
        res.status(404);
      }

      res.send(data);
    }

    /**
     * [Gets every user who's friend of a specific one]
     * @param  {request}  req [Input (ID of user)]
     * @param  {response}  res [send a JSON with al user's friends]
     * @return {Promise}     [return a JSON with users (friends)]
     */

    async getAllFriends(req, res) {
      let data = await User.selectAllFriends(req.params.userId);
      const json = {
        data: data,
        total_count: data.length,
      };

      if (data.length === 0) {
        res.status(404);
      }

      res.send(json);
    }

    //Logical delete
    /**
     * Deletes logically a specific user
     * @param  {type}  req [Input (ID of users to be deleted)]
     * @param  {type}  res [Response]
     * @return {Promise}     [change status of specific users from active to inactive]
     */
    async changeActive(req, res) {
      let data = await User.changeActive(req.params.userId);
      if (data.changedRows === 0) {
        res.status(404);
      }
      res.send(data);
    }

    /**
     * Creates a new user and inserts into a database
     * @param  {request}   req  [Input (new user's info)]
     * @param  {response}   res  [Response]
     * @return {Promise}       [return a status with new user`s data]
     */
    async create(req, res, next) {
      let data = await User.create(req.body);
      res.status(201).send(data);
    }

    /**
     * Calls modify method
     * @param  {type}   req  [Input (new info)]
     * @param  {type}   res  [return a status with new user`s info]
     */
    async modify(req, res, next) {
      let data = await User.modify(req.params.userId, req.body);
      res.status(201).send(data);
    }

    /**
     * Modifies friendship status between two users
     * @param  {request}  req [Input (ID of user and friend)]
     * @param  {response}  res [send a status with data]
     * @return {Promise}     [return a data of modified user]
     */
    async modifyFriendship(req, res) {
      let data = await User.modifyFriendship(req.params.userId, req.body.friendId);
      console.log(data.affectedRows);
      if (!data.affectedRows) {
        res.status(404).send(data);
      }
      res.status(201).send(data);
    }

    /**
     * Send a request of friendship
     * @param  {request}   req  [Input (ID of user and ID of new friend)]
     * @param  {response}   res  [Response with status and data]
     * @return {Promise}       [return modified data]
     */
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

    /**
     * Changes status of pending to accepted in a friendship request
     * @param  {request}   req  [Input (ID of user and new Friend)]
     * @param  {response}   res  [Reponse with status and data]
     * @return {Promise}       [return modified data]
     */
    async acceptFriend(req, res, next) {
      let data = await User.modifyFriendship(req.body.userId, req.body.friendId);
      if (!data.affectedRows) {
        res.status(404).send(data);
      }
      res.status(201).send(data);
    }
}

module.exports = new UserCtrl();
