let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  fs = require("fs").promises,
  config = require("../config"),
  answerGenerator = require("../logic/modules/answerGenerator"),
  multer = require("multer"),
  upload = multer(),

  Validator = require("../logic/validator"),
  createProjectRule = require("../logic/validator/forms/createProject").rule(),
  createProjectValidator = new Validator(createProjectRule),
  getProProjectValidator = new Validator({
    _id: ["required"]
  }),
  getProProjectsValidator = new Validator({
    length: ["number", "positive"]
  });

router.all("*", function (req, res, next) {
  next();
});

router.post("/", function (req, res, next) {
  let data = req.body,
    validationErrors;

  validationErrors = getProProjectsValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  return mongo.project.getProjects(data)
    .then(result => {
      res.send(answerGenerator(null, { projects: result, time: Date.now() }));
    }, error => {
      res.send(answerGenerator(error))
    });
});

router.post("/project", function (req, res, next) {
  let data = req.body,
    validationErrors;

  validationErrors = getProProjectValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  return mongo.project.getProject(data)
    .then(result => {
      res.send(answerGenerator(null, result));
    }, error => {
      res.send(answerGenerator(error))
    });
});

router.post("/create", upload.single("image"), function (req, res, next) {
  if (!req.data.user)
    return res.send(answerGenerator.error.accessError());

  let image = req.file,
    user = req.data.user.user,
    data = {
      ...req.body,
      user: user.id
    },
    validationErrors;

  if (image)
    data.image = {
      ...image,
      extension: image.originalname.replace(/^.+\.(\w+)$/i, "$1"),
      originalname: image.originalname.replace(/^(.+)\.(\w+)$/i, "$1"),
    };
  else
    delete data.image;

  validationErrors = createProjectValidator.validate(data);

  if (Object.keys(validationErrors).length !== 0)
    return res.send(answerGenerator.error.requireData());

  mongo.createProject(data)
    .then((result) => {
      if (image) {
        let relPath = config.imageStorage.projectImage,
          filePath = `${req.app.get("dir")}${relPath}${result.image}`;

        return fs.writeFile(filePath, image.buffer)
          .then(() => result)
          .catch((error) => { throw error; })
      } else {
        return Promise.resolve(result);
      }
    }, (error) => {
      return res.send(answerGenerator(error));
    })
    .then((result) => {
      return res.send(answerGenerator(null, { project: result, time: Date.now() }));
    }, (error) => {
      return res.send(answerGenerator(error));
    });
});

module.exports = router;