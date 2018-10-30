const { User } = require('../models');
const { Token } = require('../models');
const bcrypt = require('bcryptjs');

class Auth {

  static async existsUser(req, res, next) {
    const user = await User.getBy(req.body.mail);
    let correctPassword = bcrypt.compareSync(req.body.password, user.id[0].password);
    if (user && correctPassword) {
        const token = await Token.get(user.id[0].user_id, 's', 1);
        if (!token) {
          Token.create(user.id[0].user_id, 's', process.env.SESSSION_EXPIRES);
        }
        next();
    } else {
        next({
          status: res.status(404),
          message: res.send('user not found'),
        });
      }
  }

  static async register(req, res, next) {
      //Se obtiene el usuario recién creado
      const user = await User.getBy(req.body.mail);
      //Se obtiene la contraseña del nuevo usuario
      const data = await Token.create(user.id[0].user_id, 's', process.env.SESSSION_EXPIRES);
      const token = await Token.get(user.id[0].user_id, 's', 1)
      console.log(JSON.stringify(token.id[0]));
      return JSON.stringify(token.id[0]);
  }

  static async getToken(req) {
    const token = req.headers.authorization;
    if (token) {
      const startIndex = token.indexOf(':');
      const lastIndex = token.indexOf(',');
      const tokenId = Number(token.substring(startIndex + 1, lastIndex));
      const finalToken = await Token.getTokenBy(tokenId);
      return finalToken;
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
    const token = await Auth.getToken(req);
    if (token) {
      const active = await Auth.isActive(token.id[0]);
      if (active) {
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
      if (active && userId == req.params.userId) {
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

}

module.exports = Auth;
