let mongoose = require("../connect"),
  schemas = require("../schemas"),
  errorHandler = require("../errorHandler");

async function getProjects({ searchDetails = {}, data } = {}, config = {}) {
  let projects;

  try {
    projects = await schemas.Project.aggregate([{
      $match: searchDetails
    }, {
      $lookup: {
        from: 'projectimages',
        localField: 'image',
        foreignField: '_id',
        as: 'image'
      }
    }, {
      $unwind: {
        path: "$image",
        preserveNullAndEmptyArrays: true
      }
    }]).session(config.session);
  } catch (error) {
    return Promise.reject(errorHandler("getProjects", error));
  }

  return projects;
}

async function getProject(searchDetails, config) {
  let project;

  try {
    project = await getProjects(searchDetails, config);
  } catch (error) {
    return Promise.reject(errorHandler("getProject", error));
  }

  return project[0];
}

async function setProject(data, config) {
  let project = new schemas.Project(data),
    responce;

  try {
    responce = await project.save(config);
  } catch (error) {
    return Promise.reject(errorHandler("setProject", error));
  }

  return responce;
}

module.exports = {
  getProjects,
  getProject,
  setProject
};