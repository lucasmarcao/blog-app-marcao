const express = require("express");
// para se conectar, é so escrever {mongod} no cmd.
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
// autenticação.
const passport = require("passport");

// conta.
router.get("/", (req, res, next) => {
  res.render("usuario/conta");
});
router.get("/pessoa/:email", (req, res, next) => {
  try {
    Usuario.findOne({ email: req.params.email })
      .lean().then((usuarios) => {
        if (usuarios) {
          res.render("usuario/conta", { usuarios: usuarios });
        } else {
          req.flash("error_msg", "essa conta não existe poha!!!");
          res.redirect("/");
        }
      }).catch((err) => {
        req.flash("error_msg", "Erro ao encontrar conta !!!");
        res.redirect("/");
      });
  } catch (error) {
    req.flash("error_msg", "Erro ao encontrar conta !!!");
    res.redirect("/");
  }
});

// formas.
router.get("/registro", (req, res) => {
  res.render("usuario/registro");
});
router.get("/login", (req, res) => {
  res.render("usuario/login");
});

// posts.
router.post("/registro", (req, res) => {
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
    res.render("usuario/registro", { erros: erros });
  } else {
    Usuario.findOne({ email: req.params.email }).then((usuarios) => {
      if (usuarios) {
        req.flash("error_msg", "esse email ja existe em Usuarios fdp. !!!");
        res.redirect("usuario/registro");
      } else {
        // cadastrar.
        const novoUsuario = {
          email: req.body.email,
          nome: req.body.nome,
          senha: req.body.senha,
        }

        new Usuario(novoUsuario).save().then(() => {
          req.flash("success_msg", " Agora faça login para entrar !!!");
          res.redirect("/");
        }).catch((err) => {
          req.flash("error_msg",
            "esse email ja existe em Usuarios fdp. !!!"
          );
          res.redirect("/usuario/registro");
        });
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno. !!!");
      res.redirect("/");
    });
  }
});

router.post("/login", (req, res, next) => {
  var erros = [];
  if (
    !req.body.email
    || typeof req.body.email == undefined
    || req.body.email == null
  ) {
    erros.push({ texto: 'voce não registrou o campo email !' });
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
    res.render("usuario/login", { erros: erros });
  } else {
    // comeca a autenticacao.

    passport.authenticate(
      "local",
      {
        successRedirect: "/",
        failureRedirect: "/usuario/login",
        failureFlash: true
      }
    )(req, res, next);
  }
});

// sair.
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    req.flash('success_msg', "Deslogado com sucesso!")
    res.redirect("/")
  })
})

// exportando o router.
module.exports = router;
