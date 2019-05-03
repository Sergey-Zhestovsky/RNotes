let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler"),

  projectActions = require("./projectActions"),
  projectImageActions = require("./imageActions"),
  userActions = require("./userActions"),
  notificationActions = require("./notificationActions");

async function createProject(data = {}) {
  let image = {}, project, result, session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    
    if (data.image)
      image = await projectImageActions.setImage(data.image, { session });
      
    project = await projectActions.setProject({
      ...data,
      image: image["_id"]
    }, { session });
    
    result = await projectActions.getProject(project, { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    if (error.source)
      return Promise.reject(error);

    return Promise.reject(errorHandler("createProject", error));
  }

  session.endSession();
  return result;
}

module.exports = {
  project: projectActions,
  image: projectImageActions,
  user: userActions,
  notification: notificationActions,
  createProject
};