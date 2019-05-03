let config = require("../../config"),
  User = require("../class/User"),
  Validator = require('../validator');
  jwt = require("jsonwebtoken");

let userValidator = new Validator({
  id: ["required"]
});

class Authorization {
  constructor({ authClass = User } = {}) {
    this.authClass = authClass;
    this.tokenName = "auth_token";
    this.expiresTime = new Date(Date.now() + 315360000000);
    this.sessionName = "session_token";
  }

  authorize(request, response) {
  
    let authToken = request.cookies[this.tokenName],
      sessionToken = request.cookies[this.sessionName]

    if (!authToken || !sessionToken)
      return this.shutDown(request, response);

    return new Promise((resolve, reject) => {
      jwt.verify(authToken, config["encode_server_key"], (err, decoded) => {
        if (err) {
          this.shutDown(request, response);
          reject(err);
        }

        request.data.user = new this.authClass(decoded);
        resolve();
      });
    });
  }

  shutDown(request, response) {
    delete request.data.user;
    response.cookie(this.tokenName, null, { expires: new Date(0) });
    response.cookie(this.sessionName, null, { expires: new Date(0) });
  }

  login(request, response, user) {
    return new Promise((resolve, reject) => {
      let errors = userValidator.validate(user);

      if (Object.keys(errors).length > 0)
        return reject(errors);

      let authUser = new this.authClass(user);
      request.data.user = authUser;
      authUser = authUser.user;

      let userJSON = JSON.stringify(authUser),
        authToken = jwt.sign(userJSON, config["encode_server_key"]),
        sessionToken = jwt.sign(authToken, config["encode_server_key"]);

      response.cookie(this.tokenName, authToken, {
        expires: this.expiresTime, 
        httpOnly: true 
      });
      response.cookie(this.sessionName, sessionToken, {
        expires: this.expiresTime
      });

      return resolve(authUser);
    });
  }
}

module.exports = Authorization;