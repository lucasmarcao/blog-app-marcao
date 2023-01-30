const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uploadUser = require("../middlewares/uploadImage");
require("../models/Classe");
const Classe = mongoose.model("classes");
require("../models/Jogador");
const Jogador = mongoose.model("jogadores");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const { eAdmin } = require("../helpers/eAdmin");
const fs = require("fs");

// pagina principal
router.get("/", (req, res) => {
  res.render("admin/index");
});
// classes de personagem
router.get("/classes", (req, res) => {
  Classe.find()
    .lean()
    .sort({ verdadeData: "desc" })
    .then((classes) => {
      res.render("admin/class/classes", { classes: classes });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
      res.redirect("/admin");
    });
});
router.get("/classes/add", eAdmin, (req, res) => {
  res.render("admin/class/addclasses");
});
router.post("/classes/nova", eAdmin, uploadUser.single("image"), (req, res) => {
  var erros = [];

  if (
    !req.body.titulo ||
    typeof req.body.titulo == undefined ||
    req.body.titulo == null ||
    req.body.titulo.length < 4
  ) {
    erros.push({
      texto: "Nome Inválido.",
    });
  }

  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null ||
    req.body.slug.length < 4
  ) {
    erros.push({
      texto: "Slug Inválido.",
    });
  }

  if (erros.length > 0) {
    res.render("admin/class/addclasses", { erros: erros });
  } else {
    const novaClasse = {
      titulo: req.body.titulo,
      slug: req.body.slug,
      dataClasse: req.body.dataclasse,
      verdadeData: Date.now(),
      caminho: req.body.caminho,
    };

    new Classe(novaClasse).save().then(() => {
      req.flash("success_msg", "Classe criada com sucesso !!!");
      res.redirect("/admin/classes");
    }).catch((err) => {
      req.flash("error_msg", "Erro ao salvar classe !!!");
      res.redirect("/admin/classes");
    });
  }
});
router.get("/classes/edit/:id", eAdmin, (req, res) => {
  Classe.findOne({ _id: req.params.id })
    .lean()
    .then((classes) => {
      res.render("admin/class/editclasses", { classes: classes });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao encontrar classe !!!");
      res.redirect("/admin/classes");
    });
});
router.post("/classes/edit/", eAdmin,
  uploadUser.single("image"),
  (req, res) => {
    Classe.findOne({ _id: req.body.id })
      .then((classes) => {
        classes.titulo = req.body.titulo;
        classes.slug = req.body.slug;
        classes.dataClasse = req.body.dataclasse;
        classes.verdadeData = Date.now();
        if (req.body.caminho == req.body.caminhoantigo) {
          classes.caminho = req.body.caminhoantigo;
        } else {
          classes.caminho = req.body.caminho;
          try {
            fs.unlink(`./public/upload/user/${req.body.caminhoantigo}`, (err) => {
              if (err) console.log(err);
              else {
                console.log(`req.body.caminho == ${req.body.caminhoantigo}`);
                // Get the files in current directory
                // after deletion
              }
            });
          } catch (error) {
            console.log("erro foi  ", error);
          }
        }
        classes
          .save()
          .then(() => {
            req.flash("success_msg", "Classe salva com sucesso!!!");
            res.redirect("/admin/classes");
          })
          .catch((err) => {
            req.flash("error_msg", "Classe não foi salva !!!");
            res.redirect("/admin/classes");
          });
      })
      .catch((err) => {
        req.flash("error_msg", "Erro ao editar classe !!!");
        res.redirect("/admin/classes");
      });
  });
router.post("/classes/excluir", eAdmin, (req, res) => {
  Classe.deleteOne({ _id: req.body.id })
    .then((classes) => {
      req.flash("succes_msg", "Classe excluida com sucesso !!!");
      res.redirect("/admin/classes");
      try {
        fs.unlink(`./public/upload/user/${req.body.caminho}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`req.body.caminho == ${req.body.caminho}`);
            // Get the files in current directory
            // after deletion
          }
        });
      } catch (error) {
        console.log("erro foi  ", error);
      }
    })
    .catch((err) => {
      req.flash("succes_msg", "erro ao excluir Classe !!!");
      res.redirect("/admin/classes");
    });
});
// jogadores do jogo.
router.get("/jogadores", (req, res) => {
  // Classe.find()
  //   .lean()
  //   .sort({ verdadeData: "desc" })
  //   .then((classes) => {
  //     res.render("admin/class/classes", { classes: classes });
  //   })
  //   .catch((err) => {
  //     req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
  //     res.redirect("/admin");
  //   });

  Jogador.find().populate("classe")
    .lean()
    .sort({ verdadeData: "desc" })
    .then((jogadores) => {
      res.render("admin/jogadores/jogadores", { jogadores: jogadores });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
      res.redirect("/admin");
    });
});
router.get("/jogadores/add", eAdmin, (req, res) => {
  Classe.find()
    .lean()
    .sort({ verdadeData: "desc" })
    .then((classes) => {
      res.render("admin/jogadores/addjogadores", { classes: classes });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
      res.redirect("/admin");
    });
});
router.post("/jogadores/nova", eAdmin, (req, res) => {
  var erros = [];

  if (req.body.classes == "0") {
    erros.push({ texto: "Classe inválida." });
  }

  if (erros.length > 0) {
    res.render("admin/jogadores/addjogadores", { classes: classes });
  } else {
    const novoJogador = {
      nome: req.body.nome,
      slug: req.body.slug,
      level: req.body.level,
      genero: req.body.genero,
      classe: req.body.classes,
      verdadeData: Date.now(),
      dataClasse: req.body.dataclasse,
      habilidades: req.body.habilidades,
    };

    new Jogador(novoJogador)
      .save()
      .then(() => {
        req.flash("success_msg", "Jogador criado com sucesso!!!");
        res.redirect("/admin/jogadores");
      })
      .catch(() => {
        req.flash("error_msg", "Erro ao criar jogador!!!");
        res.redirect("/admin/jogadores");
      });
  }
});
router.get("/jogadores/edit/:id", eAdmin, (req, res) => {
  Jogador.findOne({ _id: req.params.id })
    .lean()
    .then((jogadores) => {

      Classe.find()
        .lean()
        .sort({ verdadeData: "desc" })
        .then((classes) => {
          res.render("admin/jogadores/editjogadores",
            { classes: classes, jogadores: jogadores }
          );
        })
        .catch((err) => {
          req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
          res.redirect("/admin/jogadores");
        });

    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao encontrar jogadores !!!");
      res.redirect("/admin/jogadores");
    });
});
router.post("/jogadores/edit", eAdmin, (req, res) => {
  Jogador.findOne({ _id: req.body.id }).then((jogadores) => {
    jogadores.nome = req.body.nome;
    jogadores.slug = req.body.slug;
    jogadores.level = req.body.level;
    jogadores.genero = req.body.genero;
    jogadores.classe = req.body.classes;
    jogadores.verdadeData = Date.now();
    jogadores.dataClasse = req.body.dataclasse;
    jogadores.habilidades = req.body.habilidades;
    Jogador.replaceOne({ _id: req.body.id }, jogadores).then(() => {
      req.flash("success_msg", "Jogador salva com sucesso!!!");
      res.redirect("/admin/jogadores");
    }).catch((err) => {
      req.flash("error_msg", "Classe não foi salva !!!");
      res.redirect("/admin/jogadores");
    });
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar as classes. !!!");
    res.redirect("/admin/jogadores");
  });
});
router.post("/jogadores/excluir", eAdmin, (req, res) => {
  Jogador.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("succes_msg", "Jogador excluido com sucesso !!!");
      res.redirect("/admin/jogadores");
    })
    .catch((err) => {
      req.flash("succes_msg", "erro ao excluir Jogador !!!");
      res.redirect("/admin/classes");
    });
});

// usuarios
router.get("/usuario", (req, res) => {
  Usuario.find()
    .lean()
    .sort({ verdadeData: "desc" })
    .then((usuarios) => {
      res.render("admin/usuario/usuario", { usuarios: usuarios });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar os usuarios. !!!");
      res.redirect("/admin");
    });
});
router.get("/usuario/add", (req, res) => {
  res.render("admin/usuario/add");
});
router.post("/usuario/nova", (req, res) => {
  var erros = [];
  if (
    !req.body.email
    || typeof req.body.email == undefined
    || req.body.email == null
  ) {
    erros.push({ texto: 'voce não registrou o campo email !' });
  }
  if (
    !req.body.nome
    || typeof req.body.nome == undefined
    || req.body.nome == null
  ) {
    erros.push({ texto: 'voce não registrou o campo nome !' });
  }
  if (
    !req.body.senha
    || typeof req.body.senha == undefined
    || req.body.senha == null
  ) {
    erros.push({ texto: 'voce não registrou o campo senha !' });
  }

  // verificar se tem algum erro.
  if (req.body.senha.length < 4) {
    erros.push({ texto: `a senha é bem curta.` });
  }
  if (erros.length > 0) {
    res.render("usuario/add", { erros: erros });
  } else {
    Usuario.findOne({ email: req.params.email }).lean()
      .sort({ verdadeData: "desc" }).then((usuarios) => {
        if (usuarios) {
          req.flash("error_msg", "esse email ja existe em Usuarios fdp. !!!");
          res.redirect("/admin/usuario/");
        } else {
          // cadastrar.
          const novoUsuario = {
            email: req.body.email,
            nome: req.body.nome,
            senha: req.body.senha,
            eAdmin: req.body.eAdmin,
          }
          new Usuario(novoUsuario).save().then(() => {
            req.flash("success_msg", "usuario criado com sucesso!!!");
            res.redirect("/admin/usuario/");
          }).catch((err) => {
            console.log(err)
            req.flash("error_msg", "Erro ao criar usuario!!!");
            res.redirect("/admin/usuario/");
          });
        }
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno. !!!");
        res.redirect("/404");
      });
  }
});
router.get("/usuario/edit/:id", (req, res) => {
  Usuario.findOne({ _id: req.params.id })
    .lean()
    .then((usuarios) => {
      res.render("admin/usuario/edit", { usuarios: usuarios });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao encontrar classe !!!");
      res.redirect("/admin/usuario/");
    });
});
router.post("/usuario/edit", (req, res) => {
  Usuario.findOne({ _id: req.body.id })
    .then((usuarios) => {
      usuarios.email = req.body.email;
      usuarios.nome = req.body.nome;
      usuarios.senha = req.body.senha;
      usuarios.eAdmin = req.body.eAdmin;
      usuarios.verdadeData = Date.now();
      usuarios.save().then(() => {
        req.flash("success_msg", "usuario salvo com sucesso!!!");
        res.redirect("/admin/usuario/");
      }).catch((err) => {
        req.flash("error_msg", "usuario não foi salvo !!!");
        res.redirect("/admin/usuario/");
      });
    }).catch((err) => {
      req.flash("error_msg", "Erro ao editar usuario !!!");
      res.redirect("/admin/usuario/");
    });
});
router.post("/usuario/excluir", (req, res) => {
  Usuario.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("succes_msg", "Jogador excluido com sucesso !!!");
      res.redirect("/admin/usuario");
    })
    .catch((err) => {
      req.flash("succes_msg", "erro ao excluir Jogador !!!");
      res.redirect("/admin/usuario");
    });
});

// atualizações
router.get("/atualizacoes", (req, res) => {
  res.send("<h1>Pagina de atualiza.</h1>");
});
router.get("/atualizacoes/add", eAdmin, (req, res) => {
  res.send("<h1>Pagina de atualizacoes.</h1>");
});
router.post("/atualizacoes/nova", eAdmin, (req, res) => {
  res.send("<h1>Pagina de atualizacoes.</h1>");
});
router.get("/atualizacoes/edit/:id", eAdmin, (req, res) => {
  res.send("<h1>Pagina de atualizacoes.</h1>");
});
router.post("/atualizacoes/edit", eAdmin, (req, res) => {
  res.send("<h1>Pagina de atualizacoes.</h1>");
});
router.post("/atualizacoes/excluir", eAdmin, (req, res) => {
  res.send("<h1>Pagina de atualizacoes.</h1>");
});

// exportando o router.
module.exports = router;