let mongoose = require("mongoose"),
  crypto = require("crypto"),
  Schema = mongoose.Schema;

let projectSchema = new Schema({
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
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });

let projectImageSchema = new Schema({
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

let userSchema = new Schema({
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

userSchema.virtual("password")
  .set(function(pass) {
      this.salt = crypto.randomBytes(10).toString('hex');
      this.userPassword = this.encryptPassword(pass)
  })
  .get(() => this.userPassword)

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}
userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.userPassword;
}

let notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }, 
  action: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
}, { versionKey: false });

module.exports = {
  projectSchema,
  projectImageSchema,
  userSchema,
  notificationSchema
}