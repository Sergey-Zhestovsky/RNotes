let mongoose = require("../connect"),
  schemas = require("../schemas"),
  errorHandler = require("../errorHandler");

function getProjects({ searchDetails = {}, data, cb = function () { } } = {}) {
  schemas.Project.aggregate([{
    $match: searchDetails
  }, {
    $lookup: {
      from: 'projectimages',
      localField: 'image',
      foreignField: '_id',
      as: 'image'
    }
  }, {
    $unwind: "$image"
  }], mongoCB);

  function mongoCB(err, value) {
    if (err) {
      return errorHandler("getProjects", err, cb);
    }

    return cb(null, value);
  }
}

function setProject({ data, cb = function () { } } = {}) {
  let project = new schemas.Project(data);

  project.save(function (err, value) {
    if (err) {
      return errorHandler("setProject", err, cb);
    }
    
    cb(null, value);
  });
}

module.exports = {
  getProjects,
  setProject
};