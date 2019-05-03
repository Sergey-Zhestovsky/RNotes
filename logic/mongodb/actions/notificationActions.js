let mongoose,
  schemas,
  errorHandler = require("../errorHandler");

async function setNotification(data, config) {
  schemas = schemas || require("../models");

  let notification = new schemas.Notification(data),
    responce;

  try {
    responce = await notification.save(config);
  } catch (error) {
    return Promise.reject(errorHandler("setNotification", error));
  }

  return responce;
}

async function getNotifications({ searchDetails = {}, length = 1 } = {}, config = {}) {
  schemas = schemas || require("../models");

  let notifications;

  try {
    if (length === -1)
      length = await schemas.Notification.countDocuments();

    notifications = await schemas.Notification.aggregate([{
      $match: searchDetails
    }, {
      $sort: { date: -1 }
    }, {
      $limit: Number(length)
    }, {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    }, {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $addFields: { user: "$user.fullName" }
    }]).session(config.session);
  } catch (error) {
    return Promise.reject(errorHandler("getNotifications", error));
  }

  return notifications;
}

async function getNotification(searchDetails = {}, config) {
  mongoose = mongoose || require("../connect")

  let notification;

  searchDetails._id = searchDetails._id
    ? new mongoose.Types.ObjectId(searchDetails._id)
    : undefined;

  try {
    notification = await getNotifications({ searchDetails }, config);
  } catch (error) {
    return Promise.reject(errorHandler("getNotification", error));
  }

  return notification[0];
}

module.exports = {
  setNotification,
  getNotifications,
  getNotification
};