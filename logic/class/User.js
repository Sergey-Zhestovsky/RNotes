class User {
  constructor({ id } = {}) {
    this.id = id;
  }

  get user() {
    return {
      id: this.id
    }
  }
}

module.exports = User;