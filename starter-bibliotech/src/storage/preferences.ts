// ============================================================================
// PERSISTÊNCIA LOCAL DE PREFERÊNCIAS (ASYNCSTORAGE)
// ============================================================================
// Aqui usamos AsyncStorage para persistir DADOS LOCAIS que devem sobreviver
// ao fechamento do app. NÃO usamos AsyncStorage para os livros em si - esses
// vivem na API. Aqui salvamos apenas as PREFERÊNCIAS do usuário.
//
// Conceito importante:
//   - AsyncStorage só guarda STRINGS (texto).
//   - Para guardar objetos/arrays, precisamos:
//       Salvar : JSON.stringify(objeto) → vira texto
//       Ler    : JSON.parse(texto)      → vira objeto de novo
//
// >>> SUA TAREFA <<<
// Implementar 4 funções marcadas com TODO.
// ============================================================================

import AsyncStorage from "@react-native-async-storage/async-storage";

// ----------------------------------------------------------------------------
// CHAVES DO ASYNCSTORAGE
// ----------------------------------------------------------------------------
// Boa prática: declare as chaves como constantes para evitar typos.
// Se você escrever "@bibliotech:filte" em um lugar e "@bibliotech:filter"
// em outro, NUNCA vai dar match. Constante resolve isso.
const KEY_FILTER = "@bibliotech:filter";
const KEY_LAST_VIEWED = "@bibliotech:lastViewed";

// ----------------------------------------------------------------------------
// TIPOS DAS PREFERÊNCIAS
// ----------------------------------------------------------------------------
// Filtros possíveis na tela de listagem:
//   "all"  = mostra todos os livros
//   "read" = só os que já foram lidos
//   "unread" = só os não lidos
export type BookFilter = "all" | "read" | "unread";

// ============================================================================
// FUNÇÕES DE PERSISTÊNCIA
// ============================================================================

/**
 * Salva o filtro escolhido pelo usuário (all / read / unread).
 */
export async function saveFilter(filter: BookFilter): Promise<void> {
  // TODO: use AsyncStorage.setItem(...) para salvar `filter` na chave KEY_FILTER.
  // Dica: como filter já é uma string, NÃO precisa de JSON.stringify aqui.
  throw new Error("saveFilter() ainda não foi implementada");
}

/**
 * Lê o filtro salvo. Se nunca foi salvo, retorna "all" como padrão.
 */
export async function loadFilter(): Promise<BookFilter> {
  // TODO: use AsyncStorage.getItem(...) com KEY_FILTER.
  // O getItem pode retornar null se nada nunca foi salvo.
  // Trate esse caso retornando "all".
  // Dica: se o valor existir, faça um cast para BookFilter.
  throw new Error("loadFilter() ainda não foi implementada");
}

/**
 * Salva o ID do último livro que o usuário visualizou em detalhes.
 * Útil para abrir o app já no último livro consultado.
 */
export async function saveLastViewedId(id: number): Promise<void> {
  // TODO: salve `id` na chave KEY_LAST_VIEWED.
  // Atenção: AsyncStorage só aceita STRING. Use String(id) ou id.toString().
  throw new Error("saveLastViewedId() ainda não foi implementada");
}

/**
 * Lê o ID do último livro visualizado. Retorna null se nunca foi salvo.
 */
export async function loadLastViewedId(): Promise<number | null> {
  // TODO: leia o valor da chave KEY_LAST_VIEWED.
  // Se vier null (nunca foi salvo), retorne null.
  // Se vier uma string, converta para número usando Number(...)
  throw new Error("loadLastViewedId() ainda não foi implementada");
}

// ============================================================================
// COMO USAR (exemplo - não precisa editar):
// ============================================================================
//
//   await saveFilter("read");
//   const filtro = await loadFilter(); // "read"
//
//   await saveLastViewedId(42);
//   const ultimo = await loadLastViewedId(); // 42
//
// ============================================================================
