let mongoose = require("mongoose"),
  crypto = require("crypto"),
  Schema = mongoose.Schema;

let projectScheme = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  image: {
    type: Schema.Types.ObjectId,
    default: null
  },
  date: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });

let projectImageScheme = new Schema({
  extension: {
    type: String,
    required: true
  }, 
  originalname: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
}, { versionKey: false });

let userScheme = new Schema({
  fullName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  },
  userPassword: {
      type: String,
      required: true
  },
  salt: {
      type: String,
      required: true
  }
}, { versionKey: false });

userScheme.virtual("password")
  .set(function(pass) {
      this.salt = crypto.randomBytes(10).toString('hex');
      this.userPassword = this.encryptPassword(pass)
  })
  .get(() => this.userPassword)

userScheme.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}
userScheme.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.userPassword;
}

module.exports = {
  Project: mongoose.model('Project', projectScheme),
  ProjectImage: mongoose.model('ProjectImage', projectImageScheme),
  User: mongoose.model('User', userScheme)
}