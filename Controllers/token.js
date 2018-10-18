const { Token } = require('../models');
const { User } = require('../models');

class TokenCtrl {
    constructor() {
        this.createToken = this.createToken.bind(this);
        this.changeTokenStatus = this.changeTokenStatus.bind(this);
    }

    /**
     * Creates new token
     * @param  {request}   req  [Input (Question Info)]
     * @param  {response}   res  [Response]
     * @return {Promise}       [Return data with a 201 message]
     */
    async createToken(req, res, next) {
      let usr = await User.getByUserAndPass(req.body.usern, req.body.pass);
      const expira = 604800;
      if (usr.length === 0) {
        res.status(404);
      } else {
        let tkn = await Token.getActive(usr[0].user_id);
        if (tkn.length === 0) {
          let data = await Token.create(usr[0].user_id, expira, 's');
          res.status(201).send(data);
        } else {
          res.status(409);
        }
      }
    }

    /**
     * Changes status of token
     * @param  {request}  req [Input (ID of question)]
     * @param  {response}  res [Response]
     * @return {Promise}     [Return a 200 status if was changed, 404 if it was not located]
     */
    async changeTokenStatus(req, res) {
      let data = await Question.changeActive(req.params.questionId);
      if (data.changedRows === 0) {
        res.status(404);
      }
      res.status(200).send(data);
    }

}

module.exports = new TokenCtrl();
