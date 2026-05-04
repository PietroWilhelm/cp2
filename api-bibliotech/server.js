// ============================================================================
// SERVIDOR DA API DE BIBLIOTECA PESSOAL (BIBLIOTECH)
// ============================================================================
// Esta API serve como backend para a PROVA de React Native.
// Os alunos vão consumir esta API a partir do app mobile.
//
// IMPORTANTE: Os dados ficam APENAS em memória (array `books`).
// Toda vez que o servidor for reiniciado, os dados voltam ao estado inicial.
// Isso é proposital: é uma API de aprendizado, não de produção.
//
// Para rodar:
//   1) npm install
//   2) npm start
//   3) Acesse http://localhost:3000/api-docs para ver o Swagger
// ============================================================================

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Cria a aplicação Express
const app = express();
const PORT = 3000;

// ----------------------------------------------------------------------------
// MIDDLEWARES GLOBAIS
// ----------------------------------------------------------------------------
// cors() libera que qualquer origem (inclusive o app Expo) acesse a API.
// Sem isso, o navegador/Expo Web bloquearia as requisições.
app.use(cors());

// express.json() interpreta o body das requisições POST/PUT como JSON.
// Sem isso, req.body chegaria vazio.
app.use(express.json());

// Disponibiliza a UI do Swagger em /api-docs.
// É aqui que o aluno vai LER a documentação para responder a Parte 1 da prova.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ----------------------------------------------------------------------------
// "BANCO DE DADOS" EM MEMÓRIA
// ----------------------------------------------------------------------------
// Em um sistema real, isso seria substituído por um banco (Postgres, Mongo...).
// Para a prova, um array em memória é mais do que suficiente.
let books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    genre: "Tecnologia",
    read: true,
    rating: 5,
  },
  {
    id: 2,
    title: "O Senhor dos Anéis",
    author: "J. R. R. Tolkien",
    year: 1954,
    genre: "Fantasia",
    read: false,
    rating: 0,
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2011,
    genre: "História",
    read: true,
    rating: 4,
  },
];

// Variável auxiliar para gerar IDs únicos a cada novo livro criado.
// Começa em 4 porque já temos os IDs 1, 2 e 3 acima.
let nextId = 4;

// ----------------------------------------------------------------------------
// FUNÇÃO DE VALIDAÇÃO
// ----------------------------------------------------------------------------
// Centralizamos a validação aqui para reaproveitar em POST e PUT.
// Retorna uma string com a mensagem de erro OU null se estiver tudo OK.
function validarLivro(body) {
  // Título: obrigatório, mínimo 2 caracteres
  if (!body.title || typeof body.title !== "string" || body.title.trim().length < 2) {
    return "O campo 'title' é obrigatório e deve ter ao menos 2 caracteres.";
  }
  // Autor: obrigatório, mínimo 2 caracteres
  if (!body.author || typeof body.author !== "string" || body.author.trim().length < 2) {
    return "O campo 'author' é obrigatório e deve ter ao menos 2 caracteres.";
  }
  // Ano: número entre 1000 e o ano atual
  const anoAtual = new Date().getFullYear();
  if (typeof body.year !== "number" || body.year < 1000 || body.year > anoAtual) {
    return `O campo 'year' deve ser um número entre 1000 e ${anoAtual}.`;
  }
  // Gênero: obrigatório
  if (!body.genre || typeof body.genre !== "string" || body.genre.trim().length === 0) {
    return "O campo 'genre' é obrigatório.";
  }
  // Rating: opcional, mas se vier, precisa ser número entre 0 e 5
  if (body.rating !== undefined) {
    if (typeof body.rating !== "number" || body.rating < 0 || body.rating > 5) {
      return "O campo 'rating' deve ser um número entre 0 e 5.";
    }
  }
  // Tudo OK
  return null;
}

// ============================================================================
// ROTAS
// ============================================================================

// ----------------------------------------------------------------------------
// GET / -> rota raiz, só pra confirmar que a API está no ar
// ----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    message: "API Bibliotech rodando!",
    docs: "Acesse /api-docs para ver a documentação Swagger",
    endpoints: ["/books", "/books/:id"],
  });
});

// ----------------------------------------------------------------------------
// GET /books -> lista todos os livros
// ----------------------------------------------------------------------------
// Suporta o filtro opcional ?read=true ou ?read=false na query string.
// Exemplo: GET /books?read=true devolve apenas livros já lidos.
app.get("/books", (req, res) => {
  const { read } = req.query;

  // Se a query string trouxe ?read=..., aplicamos o filtro
  if (read === "true") {
    return res.json(books.filter((b) => b.read === true));
  }
  if (read === "false") {
    return res.json(books.filter((b) => b.read === false));
  }

  // Sem filtro: devolve a lista inteira
  res.json(books);
});

// ----------------------------------------------------------------------------
// GET /books/:id -> busca um livro pelo ID
// ----------------------------------------------------------------------------
app.get("/books/:id", (req, res) => {
  // req.params.id sempre vem como STRING. Convertemos com Number().
  const id = Number(req.params.id);

  // Procura o livro com esse id
  const book = books.find((b) => b.id === id);

  // Se não achou, devolve 404
  if (!book) {
    return res.status(404).json({ error: `Livro com id ${id} não encontrado.` });
  }

  // Achou: devolve o livro
  res.json(book);
});

// ----------------------------------------------------------------------------
// POST /books -> cria um novo livro
// ----------------------------------------------------------------------------
app.post("/books", (req, res) => {
  // Valida os dados recebidos no body
  const erro = validarLivro(req.body);
  if (erro) {
    // 400 = Bad Request (dados inválidos enviados pelo cliente)
    return res.status(400).json({ error: erro });
  }

  // Monta o novo livro com ID gerado pelo servidor
  const novoLivro = {
    id: nextId++, // pega o próximo id e já incrementa
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year,
    genre: req.body.genre.trim(),
    read: req.body.read === true, // se não vier, vira false
    rating: typeof req.body.rating === "number" ? req.body.rating : 0,
  };

  // Adiciona na lista
  books.push(novoLivro);

  // 201 = Created (recurso criado com sucesso)
  res.status(201).json(novoLivro);
});

// ----------------------------------------------------------------------------
// PUT /books/:id -> atualiza um livro existente
// ----------------------------------------------------------------------------
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  // Procura o índice no array (precisamos do índice para substituir)
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Livro com id ${id} não encontrado.` });
  }

  // Valida os dados novos
  const erro = validarLivro(req.body);
  if (erro) {
    return res.status(400).json({ error: erro });
  }

  // Substitui o livro mantendo o mesmo ID
  const livroAtualizado = {
    id, // ID nunca muda
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year,
    genre: req.body.genre.trim(),
    read: req.body.read === true,
    rating: typeof req.body.rating === "number" ? req.body.rating : 0,
  };

  books[index] = livroAtualizado;

  res.json(livroAtualizado);
});

// ----------------------------------------------------------------------------
// DELETE /books/:id -> remove um livro
// ----------------------------------------------------------------------------
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Livro com id ${id} não encontrado.` });
  }

  // Remove o livro do array
  // splice(index, 1) = a partir do índice, remova 1 elemento
  const [removido] = books.splice(index, 1);

  // 200 com o livro removido (alternativa: 204 No Content)
  res.json({ message: "Livro removido com sucesso", book: removido });
});

// ============================================================================
// INICIA O SERVIDOR
// ============================================================================
app.listen(PORT, () => {
  console.log("============================================");
  console.log(` API Bibliotech rodando em:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(` Documentação Swagger:`);
  console.log(`   http://localhost:${PORT}/api-docs`);
  console.log("============================================");
});
