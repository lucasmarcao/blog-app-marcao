const multer = require("multer");
const img = require("../config/img");


// data legal
let dateforma = new Date();
let dia = dateforma.getDate().toString();
let mes = Number(dateforma.getMonth() + 1).toString();
let ano = dateforma.getFullYear().toString();
let hora = dateforma.getHours().toString();
let minuto = dateforma.getMinutes().toString();
let imprimiData = "";
setInterval(() => {
  dateforma = new Date();
  dia = dateforma.getDate().toString();
  mes = Number(dateforma.getMonth() + 1).toString();
  ano = dateforma.getFullYear().toString();
  hora = dateforma.getHours().toString();
  minuto = dateforma.getMinutes().toString();
  if (parseInt(minuto) < 10) {
    minuto = "0" + minuto;
  }

  if (parseInt(hora) < 10) {
    hora = "0" + hora;
  }

  if (parseInt(dia) < 10) {
    dia = "0" + dia;
  }

  if (parseInt(mes) < 10) {
    mes = "0" + mes;
  }
  imprimiData =
    "" +
    dia.toString() +
    "-" +
    mes.toString() +
    "-" +
    ano.toString() +
    "-hora-" +
    hora.toString() +
    "-" +
    minuto.toString();
}, 1000);

// exportando
module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, img.imgURI);
    },
    filename: (req, file, cb) => {
      cb(null, imprimiData + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );

    if (extensaoImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
