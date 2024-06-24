// carregando modulos.
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const usuario = require("./routes/usuario");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
// para se conectar, é so escrever {mongod} no cmd.
const mongoose = require("mongoose");
require("./models/Classe");
const Classe = mongoose.model("classes");
require("./models/Jogador");
const Jogador = mongoose.model("jogadores");
// autenticação.
const db = require("./config/db");
const img = require("./config/img");
const passport = require("passport");
require("./config/auth")(passport);

// Configurações.
// ---> Sessão.
app.use(
  session({
    secret: "luguiGeron",
    resave: true,
    saveUninitialized: true,
  })
);
// configura o passport
app.use(passport.initialize());
app.use(passport.session());
// configura o flash
app.use(flash());
// ---> Midleware.
app.use((req, res, next) => {
  // Variavel global.
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
// ---> body parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ---> handlebars.
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
// ---> mongoose.
mongoose.Promise = global.Promise;
mongoose
  .connect(
    db.MongoURI
  )
  .then(() => {
    console.log(
      `SO=  ${process.platform}
  Conectou com o Mongodb !!! 
  URL = ${db.MongoURI}
  IMG = ${img.imgURI}`
    );
  })
  .catch((erro) => {
    console.log(db.MongoURI,
      "\n Não foi possivel conectar ao mongo, pois: "
      +
      erro);
  });

// ---> Public.
app.use(express.static(path.join(__dirname, "public")));
// midleware.
// app.use((req, res, next) => {
//   console.log("oi eu sou um midleware");
//   next();
// });

// Rotas.
app.get("/", (req, res) => {
  Jogador.find().populate("classe")
    .lean()
    .sort({ verdadeData: "desc" })
    .then((jogadores) => {
      res.render("index", { jogadores: jogadores });
    })
    .catch((cagou) => {
      console.log(cagou);
      res.redirect("/404");
      req.flash("error_msg", "Houve um erro interno. !!!");
    });
});

app.get("/jogador/:slug", (req, res) => {
  Jogador.findOne({ slug: req.params.slug }).populate("classe")
    .lean()
    .sort({ verdadeData: "desc" })
    .then((jogadores) => {
      if (jogadores) {
        res.render("jogador/index", { jogadores: jogadores });
      } else {
        req.flash("error_msg", "esse slug não existe fdp. !!!");
        res.redirect("/");
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno. !!!");
      res.redirect("/404");
    });
});


app.get("/classes", (req, res) => {
  Classe.find().lean().sort({ dataClasse: "desc" })
    .then((classes) => {
      res.render("classe/index", { classes: classes });
    })
    .catch((err) => {
      req.flash("error_msg", "nao deu pra entrar em page classes. !!!");
      res.redirect("/404");
    });
});

app.get("/classes/:slug", (req, res) => {
  Classe.findOne({ slug: req.params.slug }).lean()
    .sort({ verdadeData: "desc" })
    .then((classes) => {
      if (classes) {
        Jogador.find(
          { classe: classes._id }
        ).populate("classe").lean()
          .sort({ verdadeData: "desc" }).then((jogadores) => {
            res.render("classe/jogadores",
              { jogadores: jogadores, classes: classes }
            );
          }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno. !!!");
            res.redirect("/404");
          });
      } else {
        req.flash("error_msg", "esse slug não existe em classes fdp. !!!");
        res.redirect("/");
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno. !!!");
      res.redirect("/404");
    });
});

// CATCH.
app.get("/404", (req, res) => {
  res.send("<h1>Erro 404!</h1>");
});
// RESTO LIXO.
app.get("/jogadores", (req, res) => {
  Jogador.find().populate("classe")
    .lean()
    .sort({ verdadeData: "desc" })
    .then((jogadores) => {
      res.render("jogador/jogadores", { jogadores: jogadores });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno. !!!");
      res.redirect("/404");
    });
});
app.get("/atualizacoes", (req, res) => {
  res.send("<h1>Pagina de atualiza.</h1>");
});

// uses.

app.use("/admin", admin);
app.use("/usuario", usuario);
// Outros.
const PORT = process.env.PORT || 8081;
try {
  app.listen(PORT, () => {
    console.log(`process.env.PORT == ${process.env.PORT} \n`);
    console.log("servidor rodando !!! para entrar, http://localhost:8081/ !!!");
  });
} catch (error) {
  console.log("Servidor não rodou !!! , pois : ", error);
}
