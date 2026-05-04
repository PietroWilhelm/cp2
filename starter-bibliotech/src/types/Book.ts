// ============================================================================
// TIPOS RELACIONADOS A LIVRO
// ============================================================================
// Este arquivo concentra TODOS os tipos relacionados a livros.
// Centralizar tipos em um lugar evita duplicação e facilita manutenção.
// ============================================================================

/**
 * Representa um livro como ele vem da API (com id gerado pelo servidor).
 * Use este tipo sempre que estiver LENDO dados (GET).
 */
export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  read: boolean;
  rating: number;
};

/**
 * Representa o INPUT de um livro - sem id, porque o id é gerado pelo servidor.
 * Use este tipo no POST (criação) e no formulário antes do envio.
 *
 * Dica: o tipo "Omit<Book, 'id'>" do TypeScript pega todos os campos de Book
 * MENOS o id. Isso evita duplicar a lista de campos.
 */
export type BookInput = Omit<Book, "id">;

/**
 * Tipo do erro retornado pela API quando algo dá errado (ex: validação).
 * A API responde { error: "mensagem" } com status 400/404.
 */
export type ApiError = {
  error: string;
};
