if (process.platform == 'win32') {
  module.exports = {
    MongoURI: "mongodb://admin:enquebravel1@localhost/blogmarcao?authSource=admin"
  }
} else {
  module.exports = {
    MongoURI: `mongodb+srv://marcaozitos:enquebravel1@xdxdblogappmarcao.tjerspy.mongodb.net/test`
  }
}