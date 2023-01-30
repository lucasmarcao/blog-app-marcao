if (process.platform == 'win32') {
  module.exports = { MongoURI: "mongodb://localhost/blogmarcao" }
} else {
  module.exports = {
    MongoURI: `mongodb+srv://marcaozitos:enquebravel1@xdxdblogappmarcao.tjerspy.mongodb.net/test`
  }
}