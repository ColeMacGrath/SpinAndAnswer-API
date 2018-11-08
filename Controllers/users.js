const { User } = require('../models');
const { auth } = require('../middlewares');
const { Token } = require('../models');
const mailer = require('../mail');
const bcrypt = require('bcryptjs');
const loginMiddleWare = require('../middlewares');

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
        res.status(404).send('Users not found');
      }

      res.status(200).send(json);
    }

    async get(req, res) {
      let data = await User.get(req.params.userId);
      if (!data) {
        res.status(404).send('User not found');
      }

      res.status(200).send(data);
    }

    async getAllFriends(req, res) {
      let data = await User.selectAllFriends(req.params.userId);
      const json = {
        data: data,
        total_count: data.length,
      };

      if (data.length === 0) {
        res.status(404).send('You are a loner, find some friends  ');
      }

      res.status(200).send(json);
    }

    //Logical delete
    async changeActive(req, res) {
      let data = await User.changeActive(req.params.userId);
      if (data.changedRows === 0) {
        res.status(409).send('Could not change the status');
      }
      res.status(200).send('Status changed');
    }

    async create(req, res, next) {
      let data = await User.create(req.body);
      if (data.length === 0) {
        res.status(404).send('Could not create user');
      }
      loginMiddleWare.auth.register(req, res, next);
      UserCtrl.sendMail(data.id.mail, 'Welcome to SpinAndAnswer!');
    }

    async modify(req, res, next) {
      let data = await User.modify(req.params.userId, req.body);
      if (data.affectedRows) {
        res.status(200).send('User modified');
      } else {
        res.status(404).send('Could not modify user');
      }
    }

    async modifyFriendship(req, res) {
      let data = await User.modifyFriendship(req.params.userId, req.body.friendId);
      if (!data.affectedRows) {
        res.status(404).send('Could not change frienship');
      }
      res.status(200).send('Frienship situation changed');
    }

    async addFriend(req, res, next) {
      let friend = await User.get(req.body.friendId);
      if (friend) {
        if (friend.id[0].active) {
          let data = await User.addFriend(req.body.userId, req.body.friendId);
          if (!data) {
            res.status(404).send('Request already sent');
          } else {
            res.status(200).send('Resquest sent');
          }
        } else {
          res.status(404).send('User not found');
        }
      } else {
        res.status(404).send('User not found');
      }
    }

    async acceptFriend(req, res, next) {
      let data = await User.modifyFriendship(req.body.userId, req.body.friendId);
      if (!data.affectedRows) {
        res.status(404).send('Imposible to accept request');
      }
      res.status(200).send('Friend added');
    }

    async getQuestionsBy(req, res, next) {
      let data = await User.getQuestionsBy(req.params.userId);
      if (!data) {
        res.status(404).send('Could not get questions');
      }
      res.status(200).send(data);
    }

    async login(req, res, next) {
      let data = await User.getBy(req.body.mail, req.body.password);
      if (data.length === 0) {
        res.status(404).send('User not found');
      }
      res.status(200).send('Logged in');
    }

    async logout(req, res, next) {
      let token = await auth.getToken(req);
      if (token) {
        let change = await Token.changeActive(token.id[0].token_id);
        if (change.affectedRows) {
          res.status(200).send('User disconnected successfully');
        } else {
          res.status(409).send('The user could not be disconnected');
        }
      } else {
        res.status(403).send('User not logged in');
      }
    }

    async changePassword(req, res, next) {
      let password = req.body.password;
      let tokenId = req.params.tokenId;
      let token = await Token.getTokenBy(tokenId);
      let userId = token.id[0].user_id;
      password = bcrypt.hashSync(String(password));
      try {
        let change = await Token.changeActive(token.id[0].token_id);
        if (change.affectedRows) {
          await User.modifyPassword(userId, password);
          res.status(200).send('Password changed successfully');
        } else {
          res.status(400).send('Password could not be changed');
        }
      } catch (e) {
        res.status(400).send('Could not change password');
        throw e;
      }
    }

    async resetPassword(req, res, next) {
      let mail = req.body.mail;
      let user = await User.getBy(mail);
      if (user) {
        await Token.create(user.id[0].user_id, 'r', process.env.RESET_EXPIRES);
        let token = await Token.get(user.id[0].user_id, 'r', 1);
        let url = 'https://spinandanswer.herokuapp.com/users/reset/' + token.id[0].token_id;
        UserCtrl.sendMail(user.id[0].mail, url);
        res.status(200).send('Message sent');
      } else {
        res.status(500).send('Could not sent message');
      }
    }

    static async sendMail(mail, message) {
      let mailOptions = {
           to: mail,
           subject: 'Register Completed',
           html: `<b>${message}</b>`,
       };
      mailer.sendMail(mailOptions);
    }

    async friendshipRequest(req, res, next){
      let data = await User.getFriendshipRequest(req.params.userId);
      if (data.length == 0){
        res.status(404).send('You do not have any friends request')
      }
      res.status(200).send(data);
    }
}

module.exports = new UserCtrl();
