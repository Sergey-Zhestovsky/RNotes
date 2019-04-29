let mongoose = require("../connect"),
  schemas = require("../schemas"),
  errorHandler = require("../errorHandler");

  async function setImage(data, config) {
  let image = new schemas.ProjectImage(data),
    responce;

  try {
    responce = await image.save(config);
  } catch (error) {
    return Promise.reject(errorHandler("setImage", error));
  }

  return responce;
}

module.exports = {
  setImage
};