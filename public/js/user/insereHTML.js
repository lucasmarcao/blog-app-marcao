// vars.
const insereLinks = document.querySelector("head");

// Variaveis CHAVE do localStorage
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("COR_TEMA")) ?? [];
const setLocalStorage = (dbCor) => {
  localStorage.setItem("COR_TEMA", JSON.stringify(dbCor));
};

// Crud - Read.
const listarCores = () => getLocalStorage();

try {
  // insere links.
  try {
    const diretorioPai = listarCores();
    insereLinks.innerHTML += `
    <link rel="shortcut icon" href="/img/based.png" type="image/x-icon">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/css/extras.css">
    <link rel="stylesheet" href="/css/modal.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/aside.css">
    <link rel="stylesheet" href="/css/footer.css">
    <link rel="stylesheet" href="/css/form.css">
    <link rel="stylesheet" href="/css/hq.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" id="tagCSS" href="${diretorioPai[0].diretorio}">
  `;
  } catch (xxx) {
    const diretorioPai = listarCores();
    insereLinks.innerHTML += `
    <link rel="shortcut icon" href="/img/based.png" type="image/x-icon">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/css/extras.css">
    <link rel="stylesheet" href="/css/modal.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/aside.css">
    <link rel="stylesheet" href="/css/footer.css">
    <link rel="stylesheet" href="/css/form.css">
    <link rel="stylesheet" href="/css/hq.css">
    <link rel="stylesheet" href="/css/global.css">
    <link rel="stylesheet" href="/css/nav.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" id="tagCSS" href="/css/cores.css">
  `;
    console.info("o tema nao carregou pois: \n", xxx);
  }

  // insere navbar.
  const navbar = document.querySelector("nav");
  navbar.innerHTML = `
  <div type="button" class="btn centro so-celular" data-toggle="modal" data-target="#staticBackdrop">
      <img src="/img/menu.png" class="separa-nav-seg" alt="MENU" title="MENU">
    </div>
    <a href="/" id="homePage">
      <img src="/img/home.png" class="separa-nav-pri" alt="HOME" title="HOME">
    </a>
    <div class="centro ninho-nav">
      <a href="/html/comunidade.html" class="separa-nav-min">
        <span>
          comunidade
        </span>
      </a>
      <a href="/html/categorias.html" class="separa-nav-min">
        <span>
          categorias
        </span>
      </a>
      <a href="/html/contato.html" class="separa-nav-min">
        <span>
          contato
        </span>
      </a>
      <a href="/html/recentes.html" class="separa-nav-min ultimo-nav">
        <span>
          hqs recentes
        </span>
      </a>
    </div>
    <a href="/html/login/entrar.html">
      <img src="/img/login.png" class="fim-nav" alt="LOGAR" title="LOGAR">
    </a>
  `;

  // insere footer.
  const footer = document.querySelector("footer");
  footer.innerHTML = `
    <a href="https://www.instagram.com/lucas.marcao/" target="_blank" rel="noopener noreferrer">
      <img src="/img/insta.png" class="footer-icon1" alt="link-foter" title="instagram">
    </a>
    <a href="https://wa.me/554499787087" target="_blank" rel="noopener noreferrer">
      <img src="/img/zap.png" class="footer-icon1b" alt="link-foter" title="whatszap">
    </a>
    <div class="footer-txt">
      Site feito por Luquinha da boca e rickzinho rei delas.
    </div>
    <a href="https://www.facebook.com/lucas.marcao.12" target="_blank" rel="noopener 
    noreferrer">
      <img src="/img/face.png" class="footer-icon2a" alt="link-foter" title="facebook">
    </a>
    <a href="https://twitter.com/GoiabadaMarcao" target="_blank" rel="noopener noreferrer">
      <img src="/img/twiter.png" class="footer-icon2" alt="link-foter" title="twiter">
    </a>
  `;

  // insere modal.
  const modal = document.getElementById("staticBackdrop");
  modal.innerHTML = `
  <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header  cabeca-modal-menu">
          <h5 class="modal-title" id="staticBackdropLabel">Onde você quer ir?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body corpo-modal-menu">
          <a href="/html/comunidade.html" class="separa-nav-min">
            <span>
              comunidade
            </span>
          </a>
          <a href="/html/categorias.html" class="separa-nav-min">
            <span>
              categorias
            </span>
          </a>
          <a href="/html/contato.html" class="separa-nav-min">
            <span>
              contato
            </span>
          </a>
          <a href="/html/recentes.html" class="separa-nav-min ultimo-nav">
            <span>
              hqs recentes
            </span>
          </a>
        </div>
        <div class="modal-footer pes-menu-modal centro">
          <button type="button" class="btn btn-danger botao-modal" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-success  botao-modal">HOMEPAGE</button>
        </div>
      </div>
    </div>
  `;

  // insere flecha.
  const mudaCor = document.getElementById("caixaMudaCor");
  mudaCor.innerHTML = `
  <div class="seta-muda-cor">
    >
  </div>
  <div class="icons-muda-cor">
    <div class="centro">
      <img src="/img/logo.png" id="icon-muda-cor-um" alt="claro">
    </div>
    <div class="centro">
      <img src="/img/logo.png" id="icon-muda-cor-dois" alt="escuro">
    </div>
    <div class="centro">
      <img src="/img/logo.png" id="icon-muda-cor-tres" alt="retro">
    </div>
  </div>
  `;

  // finalizacoes.
} catch (error) {
  console.info("Nao foi possivel inserir o elemento pois: \n", error);
}
