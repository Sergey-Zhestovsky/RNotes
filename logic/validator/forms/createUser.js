module.exports = {
  mailMaxSize: 100,
  fullNameMaxSize: 100,
  passwordMaxSize: 100,
  rule() {
    return {
      email: ["required", "email", ["maxSize", this.mailMaxSize]],
      fullName: ["required", "fullName", ["maxSize", this.fullNameMaxSize]],
      password: ["required", ["maxSize", this.passwordMaxSize], ["password", "rePassword"]],
      rePassword: ["required"]
    }
  }
};