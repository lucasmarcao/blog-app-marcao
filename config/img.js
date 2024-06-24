if (process.platform == 'win32') {
  module.exports = { imgURI: "./public/upload/user" }
} else {
  module.exports = {
    imgURI:
      `./public/upload/webuser`
  }
}