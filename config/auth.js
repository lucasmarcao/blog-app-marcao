const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// model
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");



// codigo em si.



// exportar modulo.
module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "senha"
      },
      (email, senha, done) => {
        Usuario.findOne(({ email: email })).then(
          (usuario, err) => {
            if (err) {
              console.log("caiiu aqui sapoha")
              return done(err);
            }
            if (!usuario) {
              return done(null, false, { message: 'Esta conta nao existe !' });
            }
            if (usuario.senha != senha) {
              return done(null, false, { message: 'senha errada!' });
            }
            return done(null, usuario);
          })
      }
    )
  )

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  })

  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario)
    })
  })
}