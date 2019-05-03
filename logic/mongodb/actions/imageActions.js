let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function setImage({ buffer, ...data }, config) {
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