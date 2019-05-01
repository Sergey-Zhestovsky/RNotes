let express = require("express"),
  router = express.Router(),
  config = require("../config"),
  Authorization = require("../logic/authorization");

let auth = new Authorization();

router.all('*', function (req, res, next) {
  new Promise((resolve, reject) => {
    req.data = {};
    if (req.cookies)
      resolve();
    
    reject();
  })
    .then(
      auth.authorize.bind(auth, req, res),
      () => void 1)
    .then(next)
    .catch((error) => {
      console.error(error);
      
      return res.header("Connection", "close").destroy();
    });
});

module.exports = router;