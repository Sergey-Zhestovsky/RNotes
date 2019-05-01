let mongoose = require("../connect"),
  schemas = require("../schemas"),
  errorHandler = require("../errorHandler");

async function setUser(data, config) {
  let user = new schemas.User(data),
    responce;

  try {
    let userIsExisted = await getUser({email: data.email}, config);
    console.log(data);
    if ( userIsExisted )
      return Promise.reject(errorHandler("setUser", { code: "custom002" }));

    responce = await user.save(config);
    responce = await getUser(responce, config);
  } catch (error) {
    console.log(error);
    
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

async function authorizeUser({email, password}, config = {}) {
  let user;
  
  try {
    user = await getUser({email}, config);

    if (!user)
      return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));

    user = new schemas.User(user);

    if (user.checkPassword(password))
      return user;

    return Promise.reject(errorHandler("authorizeUser", { code: "custom001" }));
  } catch (error) {
    return Promise.reject(errorHandler("authorizeUser", error));
  }

  return user;
}

module.exports = {
  setUser,
  getUser,
  authorizeUser
};