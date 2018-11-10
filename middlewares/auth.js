const { User } = require('../models');
const { Token } = require('../models');
const { Game } = require('../models');
const bcrypt = require('bcryptjs');

class Auth {

  static async existsUser(req, res, next) {
    const user = await User.getBy(req.body.mail);
    if (user) {
      let correctPassword = bcrypt.compareSync(req.body.password, user.id[0].password);
      if (correctPassword) {
        const header = Auth.getHeaderToken(req.headers.authorization);
        const token = await Token.get(user.id[0].user_id, 's', 1);
        if (!token) {
          let hash = bcrypt.hashSync(String(user.id[0].user_id));
          Token.create(user.id[0].user_id, 's', process.env.SESSSION_EXPIRES, hash);
          res.json({token: hash});
        } else {
          res.json({token: token.id[0].token});
        }
      } else {
        next({
          status: res.status(404),
          message: res.send('User not found'),
        });
      }
    } else {
      next({
        status: res.status(404),
        message: res.send('User not found'),
      });
    }
  }

  static async register(req, res, next) {
      const user = await User.getBy(req.body.mail);
      let hash = bcrypt.hashSync(String(user.id[0].user_id));
      await Token.create(user.id[0].user_id, 's', process.env.SESSSION_EXPIRES, hash);
      res.json({token: hash});
  }

  static async getToken(req) {
    const header = Auth.getHeaderToken(req.headers.authorization);
    if (header) {
      const token = await Token.getTokenBy(header);
      return token;
    } else  {
      return false;
    }
  }

  static async isActive(token) {
    var active = false;
    if (token.active === 1) {
        const date = new Date(token.created_at);
        date.setDate(date.getDate() + token.expires);
        const actualDate = new Date();
        if (date > actualDate) {
          active = true;
        }
      }
   return active;
  }

  static async haveSession(req, res, next) {
    const header = Auth.getHeaderToken(req.headers.authorization);
    const token = await Token.getTokenBy(header);
    if (token) {
      if (token.id[0].active) {
        next();
      } else {
        next({
          status: res.status(403),
          message: res.send('Invalid Session'),
        });
      }
    } else {
      next({
        status: res.status(403),
        message: res.send('Invalid Session'),
      });
    }
  }

  static async canCheck(req, res, next) {
    const token = await Auth.getToken(req);
    if (token) {
      const active = await Auth.isActive(token.id[0]);
      const userId = token.id[0].user_id;
      const user = await User.get(userId);
      if (active && (userId == req.params.userId || user.id[0].admin)) {
        next();
      } else {
        next({
          status: res.status(403),
          message: res.send('You are not allowed'),
        });
      }
    } else {
      next({
        status: res.status(403),
        message: res.send('You are not allowed'),
      });
    }
  }

  static async havePermissions(req, res, next) {
    const token = await Auth.getToken(req);
    const active = await Auth.isActive(token.id[0]);
    const userId = token.id[0].user_id;
    const user = await User.get(userId);
    if (active && user.id[0].admin) {
        next();
    } else {
      next({
        status: res.status(403),
        message: res.send('You must have permissions... Sale bye'),
      });
    }
  }

  static async gameAllowed(req, res, next) {
    const token = await Auth.getToken(req);
    const game = await Game.get(req.params.gameId);
    const userId = game[0].game_user_id;
    if (token.id[0].user_id === userId) {
      next();
    } else {
      next({
        status: res.status(403),
        message: res.send('You must have permissions... Sale bye'),
      });
    }

  }

  static getHeaderToken(bearer = '') {
    return bearer.split(' ')[1];
  }

}

module.exports = Auth;
