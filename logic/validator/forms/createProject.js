module.exports = {
  titleMaxSize: 50,
  messageMaxSize: 5000,
  imageMaxSize: 20000000,
  imageType: /^image\/*/,
  rule() {
    return {
      title: ["required", ["maxSize", this.titleMaxSize]],
      message: [["maxSize", this.messageMaxSize]],
      date: ["required"],
      image: {
        property: ["mimetype", "size"],
        rules: [
          ["test", this.imageType, "imageType"],
          ["larger", this.imageMaxSize, "imageSize"]
        ]
      }
    }
  }
};