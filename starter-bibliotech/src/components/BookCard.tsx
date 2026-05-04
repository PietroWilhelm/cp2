// ============================================================================
// COMPONENTE: BOOK CARD
// ============================================================================
// Card que exibe os dados de UM livro. Usado na tela de listagem.
// Recebe o livro + callbacks de edição e remoção.
//
// JÁ ESTÁ PRONTO. Use-o na tela de listagem.
// ============================================================================

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Book } from "../types/Book";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  // Monta uma string visual de estrelas baseada no rating (0 a 5).
  // Ex: rating=3 → "★★★☆☆"
  const stars = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  return (
    <View style={styles.card}>
      {/* Cabeçalho: título + status (lido/não lido) */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <View style={[styles.badge, book.read ? styles.badgeRead : styles.badgeUnread]}>
          <Text style={styles.badgeText}>{book.read ? "Lido" : "Não lido"}</Text>
        </View>
      </View>

      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.meta}>
        {book.year} · {book.genre}
      </Text>
      <Text style={styles.stars}>{stars}</Text>

      {/* Ações: editar / excluir */}
      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.buttonEdit]}
          onPress={() => onEdit(book)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={() => onDelete(book)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    // Sombra (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Sombra (Android)
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeRead: {
    backgroundColor: "#22c55e",
  },
  badgeUnread: {
    backgroundColor: "#f59e0b",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  author: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  stars: {
    color: "#f59e0b",
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonEdit: {
    backgroundColor: "#7c3aed",
  },
  buttonDelete: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
