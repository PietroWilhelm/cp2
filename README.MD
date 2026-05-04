# Instruções Gerais

* Esta prova é **em grupo**. Consulta à documentação oficial é permitida; uso de IA generativa **não é permitido**.
* Você recebeu **DOIS pacotes**:

  * a API **Bibliotech** (servidor que você vai consumir)
  * o **starter project** do app React Native (com TODOs marcados)
* **TypeScript é obrigatório** em todo o código. Código sem tipagem perderá pontos.
* Suba a API **ANTES** de iniciar o app. Sem ela, o app não funciona.
* Use `// TODO:` apenas como referência — apague-os ao implementar.
* Mantenha o código **bem comentado**. A clareza vale pontos.

---

# Contexto do Projeto

Você foi contratado para construir o app móvel da **Bibliotech**, uma biblioteca pessoal onde o usuário cadastra os livros que possui ou pretende ler.

O backend já está pronto — é uma API REST simples documentada via Swagger.

Seu trabalho é construir o app que consome essa API, com:

* Gerenciamento de estado via **Context API**
* Formulário com **validação**
* Persistência local com **AsyncStorage**

---

# Setup do Ambiente

## 1. Subir a API

```bash
cd api-bibliotech
npm install
npm start
```

* API: [http://localhost:3000](http://localhost:3000)
* Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 2. Subir o App

```bash
cd starter-bibliotech
npm install
npm start
```

Abra o app:

* `a` → Android
* `i` → iOS
* `w` → Web
* Ou use o QR Code com Expo Go

---

## 3. Configurar URL da API

Arquivo: `src/config.ts`

* Web ou iOS Simulator: `http://localhost:3000`
* Android Emulator: `http://10.0.2.2:3000`
* Celular físico: `http://SEU_IP_LOCAL:3000`

---

# Estrutura da Prova

| #         | Parte              | Pontos       | Tempo     |
| --------- | ------------------ | ------------ | --------- |
| 1         | Leitura do Swagger | 10           | 20 min    |
| 2         | Service de API     | 20           | 40 min    |
| 3         | Context API        | 20           | 50 min    |
| 4         | Formulário         | 20           | 50 min    |
| 5         | AsyncStorage       | 15           | 40 min    |
| 6         | Listagem + filtro  | 15           | 30 min    |
| Bônus     | Extras             | +10          | —         |
| **TOTAL** |                    | **100 + 10** | ≈ 230 min |

---

# Parte 1 — Swagger (10 pts)

Acesse: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Entrega: `parte1-swagger.txt`

### 1.1 — Endpoints (4 pts)

Formato:

```
MÉTODO /rota — descrição
```

---

### 1.2 — Modelo de Dados (3 pts)

* Campos do `Book`
* Tipos
* Quais são obrigatórios

---

### 1.3 — Códigos HTTP (3 pts)

* Criação com sucesso
* ID inexistente
* Dados inválidos

---

# Parte 2 — Service API (20 pts)

Arquivo: `src/services/api.ts`

Funções:

* `listBooks()` → GET `/books`
* `getBook(id)` → GET `/books/:id`
* `createBook(input)` → POST `/books`
* `updateBook(id, input)` → PUT `/books/:id`
* `deleteBook(id)` → DELETE `/books/:id`

### Critérios

* Tipagem correta
* Uso de `async/await`
* Retorno correto do `axios.data`

---

# Parte 3 — Context API (20 pts)

Arquivo: `src/contexts/BooksContext.tsx`

### Implementar:

* Estado global: livros, loading, error
* `useEffect` para carregar livros
* Métodos:

  * adicionar
  * editar
  * remover

### Pontuação

* Tipagem (4 pts)
* `reload()` (4 pts)
* `addBook()` (4 pts)
* `editBook()` (4 pts)
* `removeBook()` (4 pts)

Não chamar API diretamente nas telas.

---

# Parte 4 — Formulário (20 pts)

Arquivo: `src/screens/BookFormScreen.tsx`

### Validação (12 pts)

* `title`: obrigatório, mínimo 2 chars
* `author`: obrigatório, mínimo 2 chars
* `year`: entre 1000 e atual
* `genre`: obrigatório
* `rating`: 0 a 5

### Submit (8 pts)

* Bloqueia envio com erro
* Decide criar/editar
* Trata erro com Alert
* Volta para lista

---

# Parte 5 — AsyncStorage (15 pts)

Arquivo: `src/storage/preferences.ts`

Funções:

* `saveFilter(filter)`
* `loadFilter()`
* `saveLastViewedId(id)`
* `loadLastViewedId()`

AsyncStorage só salva **string**

---

# Parte 6 — Listagem + Filtro (15 pts)

Arquivo: `src/screens/BookListScreen.tsx`

### Comportamento:

* Filtro altera lista
* Filtro é salvo
* Filtro é restaurado ao abrir app

### Pontuação

* Runtime (5 pts)
* Persistência (5 pts)
* Recuperação (5 pts)

---

# Bônus (+10 pts)

* Tela de detalhes (+3)
* Busca por título (+3)
* Ordenação (+2)
* Contador (+2)

---

#  Critérios de Avaliação

| Critério       | Descrição                      |
| -------------- | ------------------------------ |
| Funcionalidade | Teste manual                   |
| TypeScript     | Penalização por `any`          |
| Organização    | Separação de responsabilidades |
| Erros          | Uso de try/catch               |
| Comentários    | Clareza                        |

---

#  Entrega

Arquivo:

```
PROVA-RN_NomeSobrenome.zip
```

Incluir:

* pasta `starter-bibliotech` (sem node_modules)
* `parte1-swagger.txt`

---

# Checklist Final

* [ ] App roda sem erros
* [ ] Lista carrega
* [ ] Cadastro funciona
* [ ] Edição funciona
* [ ] Exclusão funciona
* [ ] Validação ok
* [ ] Filtro persistido
* [ ] Arquivo swagger incluído
* [ ] node_modules removido

---

#  Boa prova!
