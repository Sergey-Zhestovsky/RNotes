let errorGenerator = require("./errorGenerator");

function answerGenerator(error, result) {
  if (error)
    return errorGenerator.create(error);
  
  return {
    error,
    result
  };
}

answerGenerator.error = errorGenerator;

module.exports = answerGenerator;