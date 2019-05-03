let mongoose = require("../connect"),
  schemas = require("../models"),
  errorHandler = require("../errorHandler");

async function getProjects({ searchDetails = {}, length = -1, paddingByProjectDate = Infinity } = {}, config = {}) {
  let projects, dbLength, isAllLoaded;

  try {
    dbLength = await schemas.Project.countDocuments();
    length = ~length ? length : dbLength;

    projects = await schemas.Project.aggregate([{
      $match: searchDetails
    }, {
      $sort: { date: -1 }
    }, {
      $match: { date: { $lt: paddingByProjectDate } }
    }, {
      $facet: {
        "countWithPadding": [{
          $count: "count"
        }],
        "result": [{
          $limit: Number(length)
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
          $addFields: {
            image: { $concat: [{ $toString: "$image._id" }, ".", "$image.extension"] },
            user: "$user.fullName"
          }
        }]
      }
    }]).session(config.session);

    projects = projects[0];

    let counted = projects.countWithPadding[0];
    
    counted = counted ? counted.count : 0;
    isAllLoaded = (dbLength - counted + length) >= dbLength;
    projects.isAllLoaded = isAllLoaded;
    delete projects.countWithPadding;
  } catch (error) {
    return Promise.reject(errorHandler("getProjects", error));
  }
  
  return projects;
}

async function getProject(searchDetails = {}, config) {
  let project;

  searchDetails._id = searchDetails._id
    ? new mongoose.Types.ObjectId(searchDetails._id)
    : undefined;

  try {
    project = await getProjects({ searchDetails }, config);
    project = project.result;
  } catch (error) {
    return Promise.reject(errorHandler("getProject", error));
  }

  return project[0];
}

async function getSourceProject(searchDetails = {}, config) {
  let project;

  searchDetails._id = searchDetails._id
    ? new mongoose.Types.ObjectId(searchDetails._id)
    : undefined;

  try {

    project = await schemas.Project.aggregate([{
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
    }]).session(config.session);

    if (project.length > 0)
      return project[0];

    return Promise.reject(errorHandler("getSourceProject", { code: "custom004" }));
  } catch (error) {
    return Promise.reject(errorHandler("getSourceProject", error));
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
  setProject,
  getSourceProject
};