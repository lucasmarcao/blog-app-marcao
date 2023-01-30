let contador = 0;

try {
  let rowBlock = document.getElementById("blocoDeImagens");
  if (rowBlock) {
    const imagens = document.querySelectorAll(".shake-left-right");
    console.log("tem tantas imag", imagens.length);
    window.addEventListener("load", () => {
      let comprimento = window.innerWidth;
      console.log("tela = ", comprimento);
      if (comprimento > 991) {
        for (let index = 0; index < imagens.length; index++) {
          imagens[index].setAttribute(
            "class",
            "col-4 shake-left-right centro-mestre"
          );
        }
      } else {
        for (let index = 0; index < imagens.length; index++) {
          imagens[index].setAttribute(
            "class",
            "col-6 shake-left-right centro-mestre"
          );
        }
      }
    });
    window.addEventListener("resize", () => {
      let comprimento = window.innerWidth;
      console.log("tela = ", comprimento);
      if (comprimento > 990) {
        for (let index = 0; index < imagens.length; index++) {
          imagens[index].setAttribute(
            "class",
            "col-4 shake-left-right centro-mestre"
          );
        }
      } else {
        for (let index = 0; index < imagens.length; index++) {
          imagens[index].setAttribute(
            "class",
            "col-6 shake-left-right centro-mestre"
          );
        }
      }
    });
  } else {
    console.log("blocoDeImagens não existe aqui.");
  }
} catch (error) {
  console.log("diga seu erro aqui: \n" + error);
}

// pra caixa muda cor.
// pro modal funfar.
try {
  let caixa = document.getElementById("caixaMudaCor");
  let flecha = document.querySelector(".seta-muda-cor");
  let icons = document.querySelector(".icons-muda-cor");
  window.addEventListener("load", () => {
    icons.setAttribute("style", "display: none;");
  });
  caixa.addEventListener("mouseenter", () => {
    flecha.setAttribute("style", "display: none;");
    icons.removeAttribute("style");
  });
  caixa.addEventListener("mouseleave", () => {
    flecha.removeAttribute("style");
    icons.setAttribute("style", "display: none;");
  });
} catch (error) {
  console.log("ta dando bosta na caixa muda cor: \n", error);
}

// pro modal funfar.
try {
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });
} catch (error) {
  console.log("o jquerry n funciona pois: \n", error);
}
