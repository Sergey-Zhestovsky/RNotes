let errorGenerator = {};

errorGenerator.create = (error, result) => {
  return {
    error,
    result
  }
};

errorGenerator.requireData = function requireData(result) {
  let error = {
    type: "RequireDataError",
    message: "The request doesn't have appropriate variables.",
    code: 101
  }

  return this.create(error, result);
};

errorGenerator.accessError = function accessError(result) {
  let error = {
    type: "AccessError",
    message: "Request doesn't have appropriate access level.",
    code: 100
  }

  return this.create(error, result);
};

errorGenerator.loginError = function loginError(result) {
  let error = {
    type: "LoginError",
    message: "Wrong email or password",
    code: 103
  }

  return this.create(error, result);
};

errorGenerator.registrationError = function registrationError(result) {
  let error = {
    type: "RegistrationError",
    message: "This mail are already in use",
    code: 104
  }

  return this.create(error, result);
};

errorGenerator.mongodbError = function mongodbError(error) {
  let setError = (origin) => {
    let error = {
      type: "MongodbError",
      message: "Server API error",
      code: 106
    };

    return this.create(error, origin);
  };

  switch (error.code) {
    case 'custom002':
      return this.registrationError();
    case 'custom001':
      return this.loginError();
    default:
      return setError(error);
  }
};

// function errorGenerator() {

//   this.dataBaseCriticalError = (result) => {
//     let error = {
//       type: "DataBaseCriticalError",
//       message: "Database request don't work properly.",
//       code: 102
//     }

//     return this.create(error, result);
//   };



//   this.dynamicCookie = (message, dynamicToken) => {
//     let error = {
//       type: "DynamicCookie",
//       message: "Problem with security sign: " + message,
//       code: 107
//     }

//     return this.create(error, { dynamicToken });
//   };
// }

module.exports = errorGenerator;