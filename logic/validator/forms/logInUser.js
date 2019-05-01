module.exports = {
  mailMaxSize: 100,
  passwordMaxSize: 100,
  rule() {
    return {
      email: ["required", "email", ["maxSize", this.mailMaxSize]],
      password: ["required", ["maxSize", this.passwordMaxSize]]
    }
  }
};