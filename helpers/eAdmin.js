module.exports = {
  eAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.eAdmin == 1) {
      return next()
    }

    req.flash("error_msg", "VOCE DEVE SER O ADMIN PRA ENTRAR AQUI !!");
    res.redirect("/admin/");
  }
}