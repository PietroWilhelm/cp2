// ============================================================================
// SERVICE DE API (CONSUMO REST)
// ============================================================================
// Este arquivo concentra TODA a comunicação HTTP com a API Bibliotech.
//
// Por que separar? Manter as chamadas HTTP isoladas em um único arquivo:
//  - Facilita trocar de biblioteca (axios → fetch) sem mexer nas telas
//  - Centraliza tratamento de erro
//  - Deixa os componentes mais limpos (eles só chamam funções nomeadas)
//
// >>> SUA TAREFA <<<
// Implementar as 5 funções marcadas com TODO logo abaixo.
// Cada função consome um endpoint diferente da API.
// Consulte o Swagger em http://localhost:3000/api-docs se tiver dúvidas.
// ============================================================================

import axios from "axios";
import { API_BASE_URL } from "../config";
import type { Book, BookInput } from "../types/Book";

// ----------------------------------------------------------------------------
// Cria uma instância do axios já com a baseURL configurada.
// Assim, ao invés de escrever "http://localhost:3000/books" toda hora,
// escrevemos só "/books".
// ----------------------------------------------------------------------------
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos antes de desistir da requisição
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================================
// FUNÇÕES DO CRUD
// ============================================================================
// Repare na assinatura de cada função: ela já está pronta.
// Você só precisa implementar o CORPO (entre as chaves).
// ============================================================================

/**
 * GET /books
 * Lista TODOS os livros.
 */
export async function listBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/books");
  return response.data;
}

/**
 * GET /books/:id
 * Busca UM livro pelo id.
 */
export async function getBook(id: number): Promise<Book> {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
}

/**
 * POST /books
 * Cria um novo livro. Recebe um BookInput (sem id) e a API devolve o Book com id.
 */
export async function createBook(input: BookInput): Promise<Book> {
  const response = await api.post<Book>("/books", input);
  return response.data;
}

/**
 * PUT /books/:id
 * Atualiza um livro existente.
 */
export async function updateBook(id: number, input: BookInput): Promise<Book> {
  const response = await api.put<Book>(`/books/${id}`, input);
  return response.data;
}

/**
 * DELETE /books/:id
 * Remove um livro.
 */
export async function deleteBook(id: number): Promise<void> {
  await api.delete(`/books/${id}`);
  // Não precisa retornar nada
}

// ============================================================================
// EXEMPLO COMENTADO DE COMO USAR ESSAS FUNÇÕES (NÃO PRECISA EDITAR):
// ============================================================================
//
//   import { listBooks, createBook } from "./services/api";
//
//   async function exemplo() {
//     try {
//       const livros = await listBooks();
//       console.log(livros);
//
//       const novo = await createBook({
//         title: "1984",
//         author: "George Orwell",
//         year: 1949,
//         genre: "Distopia",
//         read: false,
//         rating: 0,
//       });
//       console.log("Livro criado com id:", novo.id);
//     } catch (e) {
//       console.error("Algo deu errado:", e);
//     }
//   }
//
// ============================================================================
