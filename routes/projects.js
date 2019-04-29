let express = require("express"),
  router = express.Router(),
  mongo = require("../logic/mongodb/API"),
  fs = require("fs").promises,
  config = require("../config"),
  //errorGenerator = require('../logic/error-generator'),
  Validator = require("../logic/validator"),
  createProjectRule = require("../logic/validator/forms/createProject").rule(),
  createProjectValidator = new Validator(createProjectRule),
  multer = require("multer"),
  upload = multer();

router.all("*", function (req, res, next) {
  next();
});

router.get("/", function (req, res, next) {
  mongo.getProjects({
    cb: (error, result) => {
      if (error)
        return res.send({ error });

      return res.send({ error, result });
    }
  });

  let data = {
    projects: [
      { id: "1", title: "title for №1", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "10.10.1994", img: "https://caffaknitted.typepad.com/.a/6a00e54f8f86dc883401287636e5db970c-800wi" },
      { id: "2", title: "title for №2", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "11.10.1994", img: "https://i.kym-cdn.com/photos/images/facebook/000/035/751/41645-pikaman1_super.jpg" },
      { id: "3", title: "title for №3", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "12.10.1994", img: "http://pluspng.com/img-png/random-png-image-mabel-s-sweater-creator-random-gnome-png-gravity-falls-wiki-fandom-powered-by-wikia-510.png" }
    ]
  };
});

router.post("/create", upload.single("image"), function (req, res, next) {
  let image = req.file,
    data = {
      ...req.body
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
    return res.send({ error: "wrong data", result: {} });

  mongo.createProject(data)
    .then((result) => {
      if (image) {
        let relPath = config.imageStorage.projectImage,
          imageName = result.image._id + "." + result.image.extension,
          filePath = `${req.app.get("dir")}${relPath}${imageName}`;

        return fs.writeFile(filePath, image.buffer)
          .then(() => result)
          .catch((error) => { throw error })
      }

      return Promise.resolve(result);
    }, (error) => {
      return res.send({ error });
    })
    .then((result) => {
      return res.send({ error: null, result });
    }, (error) => {
      return res.send({ error });
    });
});

module.exports = router;