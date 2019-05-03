let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function setUser(data, config) {
  let user = new schemas.User(data),
    responce;

  try {
    let userIsExisted = await getUser({ email: data.email }, config);

    if (userIsExisted)
      return Promise.reject(errorHandler("setUser", { code: "custom002" }));

    responce = await user.save(config);
    responce = await getPublicUserData(responce._id, config);
  } catch (error) {

    return Promise.reject(errorHandler("setUser", error));
  }

  return responce;
}

async function getUser(data, config = {}) {
  let user;

  try {
    user = await schemas.User.findOne(data, config);
  } catch (error) {
    return Promise.reject(errorHandler("getUser", error));
  }

  return user;
}

async function authorizeUser({ email, password }, config = {}) {
  let user;

  try {
    user = await getUser({ email }, config);

    if (!user)
      return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return await getPublicUserData(user._id, config);

    return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));
  } catch (error) {
    return Promise.reject(errorHandler("authorizeUser", error));
  }

  return user;
}

async function getPublicUserData(id, config = {}) {
  let user;

  try {

    user = await schemas.User.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(id) }
    }, {
      $project: { fullName: 1, email: 1 }
    }]).session(config.session);

    if (user.length > 0)
      return user[0];

    return Promise.reject(errorHandler("getPublicUserData", { code: "custom003" }));
  } catch (error) {
    return Promise.reject(errorHandler("getPublicUserData", error));
  }

  return user;
}

module.exports = {
  setUser,
  getUser,
  authorizeUser,
  getPublicUserData
};