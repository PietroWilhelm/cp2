# API Bibliotech 📚

API REST simples (Node.js + Express) usada como **backend da prova de React Native**.

> ⚠️ **Atenção:** Os dados ficam apenas em memória. Toda vez que o servidor for reiniciado, os dados voltam ao estado inicial. Isso é proposital para a prova.

---

## Como rodar:

```bash
# 1) Instalar dependências
npm install

# 2) Iniciar o servidor
npm start
```

Servidor sobe em: **http://localhost:3000**
Documentação Swagger em: **http://localhost:3000/api-docs**

---

## 📡 Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/books`         | Lista todos os livros |
| GET    | `/books?read=true` | Lista apenas livros já lidos |
| GET    | `/books/:id`     | Busca um livro pelo ID |
| POST   | `/books`         | Cadastra um novo livro |
| PUT    | `/books/:id`     | Atualiza um livro existente |
| DELETE | `/books/:id`     | Remove um livro |

---

## 📋 Modelo de dados (Book)

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "genre": "Tecnologia",
  "read": true,
  "rating": 5
}
```

### Regras de validação (POST/PUT)

- `title`: obrigatório, mínimo 2 caracteres
- `author`: obrigatório, mínimo 2 caracteres
- `year`: número entre 1000 e o ano atual
- `genre`: obrigatório
- `rating`: opcional, número entre 0 e 5

---

## 🧪 Testando rapidamente (curl)

```bash
# Listar todos
curl http://localhost:3000/books

# Criar um livro
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","year":1949,"genre":"Ficção","read":false,"rating":0}'

# Atualizar
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","year":2008,"genre":"Tecnologia","read":true,"rating":4}'

# Deletar
curl -X DELETE http://localhost:3000/books/1
```

---

## 📱 Conectando o app React Native

> No Android Emulator, **NÃO use `localhost`**. Use `http://10.0.2.2:3000`.
> No iOS Simulator e Web, `http://localhost:3000` funciona.
> No celular físico (Expo Go), use o IP da sua máquina na rede local: `http://192.168.x.x:3000`.

Para descobrir seu IP na rede:
- **Windows:** `ipconfig` (procure por "Endereço IPv4")
- **Linux/macOS:** `ifconfig` ou `ip addr`
