// diretorios.
const claro = "/css/themes/temaClaro.css";
const escuro = "/css/themes/temaEscuro.css";
const retro = "/css/themes/temaRetro.css";

// variaveis
let temaClaro = {
  tema: "claro",
  diretorio: claro,
};
let temaEscuro = {
  tema: "escuro",
  diretorio: escuro,
};
let temaRetro = {
  tema: "retro",
  diretorio: retro,
};

try {
  // Variaveis CHAVE do localStorage
  let getLocalStorage = () =>
    JSON.parse(localStorage.getItem("COR_TEMA")) ?? [];
  let setLocalStorage = (dbCor) => {
    localStorage.setItem("COR_TEMA", JSON.stringify(dbCor));
  };

  // Crud - Read.
  let listarCores = () => getLocalStorage();
  // Crud - Update.
  const AtualizarCor = (Cor) => {
    const dbCor = listarCores();
    dbCor[0] = Cor;
    setLocalStorage(dbCor);
    return "Dados da cor atualizados.";
  };

  // Crud - Delete.
  const deletarCor = () => {
    const dbCor = listarCores();
    dbCor.splice(0, 1);
    setLocalStorage(dbCor);
  };
  // classes DOM
  const iconUm = document.getElementById("icon-muda-cor-um");
  const iconDois = document.getElementById("icon-muda-cor-dois");
  const iconTres = document.getElementById("icon-muda-cor-tres");
  let tagCSS = document.getElementById("tagCSS");
  // eventos
  iconUm.addEventListener("click", () => {
    console.info("apertou 1");
    AtualizarCor(temaClaro);
    tagCSS.setAttribute("href", claro);
  });
  iconDois.addEventListener("click", () => {
    console.info("apertou 2");
    AtualizarCor(temaEscuro);
    tagCSS.setAttribute("href", escuro);
  });
  iconTres.addEventListener("click", () => {
    console.info("apertou 3");
    AtualizarCor(temaRetro);
    tagCSS.setAttribute("href", retro);
  });
} catch (error) {
  console.log("deu erro pois: \n", error);
}
