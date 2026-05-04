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
  await AsyncStorage.setItem(KEY_FILTER, filter);
}

/**
 * Lê o filtro salvo. Se nunca foi salvo, retorna "all" como padrão.
 */
export async function loadFilter(): Promise<BookFilter> {
  const value = await AsyncStorage.getItem(KEY_FILTER);
  if (value === null) return "all";
  return value as BookFilter;
}

/**
 * Salva o ID do último livro que o usuário visualizou em detalhes.
 * Útil para abrir o app já no último livro consultado.
 */
export async function saveLastViewedId(id: number): Promise<void> {
  await AsyncStorage.setItem(KEY_LAST_VIEWED, String(id));
}

/**
 * Lê o ID do último livro visualizado. Retorna null se nunca foi salvo.
 */
export async function loadLastViewedId(): Promise<number | null> {
  const value = await AsyncStorage.getItem(KEY_LAST_VIEWED);
  if (value === null) return null;
  return Number(value);
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
