const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Jogador = new Schema({
  nome: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  classe: {
    type: Schema.Types.ObjectId,
    ref: "classes",
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
  habilidades: {
    type: String,
    required: true,
  },
});

mongoose.model("jogadores",Jogador);
