# Blog App Marcao

Este é um projeto de aplicação de blog desenvolvido com **Node.js** utilizando o framework **Express** e **MongoDB**. A aplicação permite cadastrar e exibir jogadores, classes e realizar login/autenticação de usuários.

## Funcionalidades

- **Autenticação de usuários**: Com a ajuda do **passport** e **express-session**.
- **Cadastro e visualização de jogadores**: Cada jogador tem informações como nome, classe, nível, etc.
- **Cadastro e visualização de classes**: As classes estão associadas a jogadores específicos.
- **Flash messages**: Utiliza **connect-flash** para exibir mensagens de sucesso ou erro.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o servidor.
- **Express**: Framework para construção do servidor web.
- **Handlebars**: Motor de templates para renderização de páginas HTML.
- **MongoDB**: Banco de dados para armazenar informações de jogadores e classes.
- **Mongoose**: Biblioteca para modelagem de objetos MongoDB em JavaScript.
- **Passport**: Middleware para autenticação de usuários.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucasmarcao/blog-app-marcao.git
    ```
  
   
2. Acesse o diretório do projeto:
   ```bash
   cd blog-app-marcao
   ```
   
3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure o banco de dados em `config/db.js`:
   - Para **Windows**, a conexão utiliza MongoDB local.
   - Para **outros sistemas**, a conexão é feita com MongoDB Atlas (na nuvem).

5. Execute o servidor:
   ```bash
   npm start
   ```
   
6. Acesse a aplicação no navegador:
   ```
   http://localhost:8081
   ```

## Estrutura do Projeto

```bash
blog-app-marcao/
├── app.js                # Arquivo principal do servidor
├── config/               # Configurações do banco de dados e imagens
│   └── db.js             # Conexão com o banco de dados
│   └── img.js            # Configuração de imagens
├── models/               # Modelos do MongoDB (Jogador, Classe)
│   └── Classe.js         # Modelo de Classe
│   └── Jogador.js        # Modelo de Jogador
├── routes/               # Rotas da aplicação
│   └── admin.js          # Rota de administração
│   └── usuario.js        # Rota de usuário
├── public/               # Arquivos públicos (CSS, JS)
├── views/                # Templates do Handlebars
└── package.json          # Dependências do projeto
```

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça as modificações e commit:
   ```bash
   git commit -m "Descrição das modificações"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

## Links Úteis

- [Repositório no GitHub](https://github.com/lucasmarcao/blog-app-marcao)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do MongoDB](https://www.mongodb.com/)

```

Esse README apresenta a estrutura do projeto, explica como configurá-lo, e detalha o
uso das tecnologias. Certifique-se de personalizar o link do
repositório e outros detalhes conforme necessário.

```



