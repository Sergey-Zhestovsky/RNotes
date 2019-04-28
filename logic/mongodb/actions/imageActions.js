let mongoose = require("../connect"),
  schemas = require("../schemas"),
  errorHandler = require("../errorHandler");

function setImage({ data, cb = function () { } } = {}) {
  let image = new schemas.ProjectImage(data);

  image.save(function (err, value) {
    if (err) {
      return errorHandler("setImage", err, cb);
    }

    cb(null, value);
  });
}

module.exports = {
  setImage
};