let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  Authorization = require("../logic/authorization"),

  Validator = require("../logic/validator"),
  createUserRule = require("../logic/validator/forms/createUser").rule(),
  logInUserRule = require("../logic/validator/forms/logInUser").rule(),
  createUserValidator = new Validator(createUserRule),
  logInUserValidator = new Validator(logInUserRule);

let auth = new Authorization();

router.all("*", function (req, res, next) {
  next();
});

router.post("/signup", function (req, res, next) {
  if (req.data.user)
    return res.send(answerGenerator.error.accessError());

  let data = req.body,
    validationErrors,
    publicUserData;

  validationErrors = createUserValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  mongo.user.setUser(data)
    .then(user => {
      publicUserData = user;
      return auth.login(req, res, { id: user._id });
    })
    .then(() => res.send(answerGenerator(null, publicUserData)))
    .catch(error => res.send(answerGenerator.error.mongodbError(error)))
});

router.post("/logout", function (req, res, next) {
  if (!req.data.user)
    return res.send(answerGenerator.error.accessError());

  auth.shutDown(req, res);
  return res.send(answerGenerator(null, true));
});

router.post("/login", function (req, res, next) {
  if (req.data.user)
    return res.send(answerGenerator.error.accessError());

  let data = req.body,
    validationErrors;

  validationErrors = logInUserValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  return mongo.user.authorizeUser(data)
    .then(
      result => {
        return auth.login(req, res, { id: result._id })
          .then(user => res.send(answerGenerator(null, result)))
      },
      error => res.send(answerGenerator.error.mongodbError(error)))
    .catch(error => {
      console.log(error);

      res.send(answerGenerator(error));
    })

  return res.send(answerGenerator(null, true));
});

router.post("/public", function (req, res, next) {
  if (!req.data.user)
    return res.send(answerGenerator.error.accessError());

  let user = req.data.user;

  return mongo.user.getPublicUserData(user.id)
    .then(result => res.send(answerGenerator(null, result)))
    .catch(error => res.send(answerGenerator.error.mongodbError(error)))

  return res.send(answerGenerator(null, true));
});


module.exports = router;