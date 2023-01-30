const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  eAdmin: {
    type: Number,
    default: 0,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  verdadeData: {
    type: Date,
    default: Date.now(),
    required: true,
  }
});

mongoose.model("usuarios", Usuario);
