// ============================================================================
// TELA: LISTAGEM DE LIVROS
// ============================================================================
// Mostra todos os livros usando o BooksContext.
// Tem botões para adicionar, editar, excluir e filtrar a lista.
//
// O QUE JÁ ESTÁ PRONTO:
//   - Estrutura visual da tela (cabeçalho, lista, botão flutuante)
//   - Confirmação antes de excluir (Alert)
//   - Navegação para a tela de formulário (criar / editar)
//
// >>> SUA TAREFA <<<
//   Implementar o FILTRO de visualização (all / read / unread):
//   1) ler o filtro salvo no AsyncStorage ao montar a tela
//   2) salvar o filtro toda vez que o usuário trocar
//   3) aplicar o filtro na lista exibida
//
// Procure pelos TODOs abaixo.
// ============================================================================

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { BookCard } from "../components/BookCard";
import { useBooks } from "../contexts/BooksContext";
import { BookFilter, loadFilter, saveFilter } from "../storage/preferences";
import type { Book } from "../types/Book";
import { RootStackParamList } from "../../App";

// Tipo das props quando esta tela é usada via React Navigation
type Props = NativeStackScreenProps<RootStackParamList, "BookList">;

export function BookListScreen({ navigation }: Props) {
  // Pega tudo que o Context expõe
  const { books, loading, error, reload, removeBook } = useBooks();

  // Estado local: o filtro selecionado pelo usuário
  const [filter, setFilter] = useState<BookFilter>("all");

  // ------------------------------------------------------------------------
  // useEffect: ao montar a tela, busca o filtro que estava salvo da última vez
  // ------------------------------------------------------------------------
  useEffect(() => {
    // TODO: chame loadFilter() (do arquivo storage/preferences.ts) e
    //       atualize o estado `filter` com o resultado.
    //       Como loadFilter é assíncrono, você precisa de uma função interna:
    //
    //   async function carregarFiltroSalvo() {
    //     const salvo = await loadFilter();
    //     setFilter(salvo);
    //   }
    //   carregarFiltroSalvo();
  }, []);

  // ------------------------------------------------------------------------
  // Função chamada quando o usuário toca em um botão de filtro.
  // ------------------------------------------------------------------------
  async function handleChangeFilter(novoFiltro: BookFilter) {
    setFilter(novoFiltro);
    // TODO: persistir o novoFiltro no AsyncStorage usando saveFilter().
  }

  // ------------------------------------------------------------------------
  // Aplica o filtro na lista vinda do Context.
  // ------------------------------------------------------------------------
  // TODO: implemente a função para retornar a lista FILTRADA conforme `filter`:
  //   - "all"    : devolve `books` inteiro
  //   - "read"   : só os livros com book.read === true
  //   - "unread" : só os livros com book.read === false
  // Por enquanto está retornando tudo (substitua a lógica abaixo).
  const livrosFiltrados: Book[] = books;

  // ------------------------------------------------------------------------
  // Confirmação antes de excluir
  // ------------------------------------------------------------------------
  function confirmDelete(book: Book) {
    Alert.alert(
      "Excluir livro",
      `Tem certeza que deseja excluir "${book.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await removeBook(book.id);
            } catch (e) {
              Alert.alert("Erro", "Não foi possível excluir o livro.");
            }
          },
        },
      ]
    );
  }

  // ------------------------------------------------------------------------
  // RENDERIZAÇÃO
  // ------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Biblioteca</Text>

      {/* Botões de filtro */}
      <View style={styles.filters}>
        <FilterButton label="Todos" active={filter === "all"} onPress={() => handleChangeFilter("all")} />
        <FilterButton label="Lidos" active={filter === "read"} onPress={() => handleChangeFilter("read")} />
        <FilterButton label="Não lidos" active={filter === "unread"} onPress={() => handleChangeFilter("unread")} />
      </View>

      {/* Mensagem de erro */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Loading */}
      {loading && <ActivityIndicator size="large" color="#7c3aed" style={{ marginTop: 16 }} />}

      {/* Lista */}
      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={reload} // pull-to-refresh já configurado
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onEdit={(b) => navigation.navigate("BookForm", { book: b })}
            onDelete={confirmDelete}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Nenhum livro encontrado.</Text>
          ) : null
        }
      />

      {/* Botão flutuante para adicionar */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate("BookForm", {})}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

// ----------------------------------------------------------------------------
// Componente local para os botões de filtro (poderia estar em outro arquivo,
// mas é usado só aqui).
// ----------------------------------------------------------------------------
function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#7c3aed",
  },
  filterText: {
    color: "#374151",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  list: {
    paddingBottom: 80,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
  error: {
    color: "#e63946",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
});
