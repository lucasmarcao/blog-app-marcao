const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Classe = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  verdadeData: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dataClasse: {
    type: String,
    required: true,
  },
  caminho: {
    type: String,
    required: true,
  }
});

mongoose.model("classes", Classe)
