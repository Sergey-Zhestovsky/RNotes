let express = require('express'),
    router = express.Router(),
    config = require('../config');

router.all('*', function(req, res, next) {
  new Promise((resolve, reject) => {
    req.data = {};
    resolve(
      //[req, res]
    );
  })

    .then(next)
    .catch(([req, res]) => {
      return res.header("Connection", "close").destroy();
    });
});

module.exports = router;