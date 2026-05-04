// ============================================================================
// TELA: FORMULÁRIO DE LIVRO (CRIAR / EDITAR)
// ============================================================================
// Esta tela é usada para DUAS coisas:
//   - Criar um novo livro (quando recebe nenhum livro nas params)
//   - Editar um livro existente (quando recebe um livro nas params)
//
// O QUE JÁ ESTÁ PRONTO:
//   - Campos do formulário (Inputs já estilizados)
//   - Detecção do modo (criar vs editar) baseada nas params
//   - Pré-preenchimento dos campos quando está em modo de edição
//
// >>> SUA TAREFA <<<
//   1) Implementar a função `validar()` que checa todos os campos
//   2) Implementar a função `handleSubmit()` que chama o Context
//
// Procure pelos TODOs.
// ============================================================================

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { Input } from "../components/Input";
import { useBooks } from "../contexts/BooksContext";
import type { BookInput } from "../types/Book";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "BookForm">;

// Tipo dos erros de validação - um campo opcional para cada input
type FormErrors = {
  title?: string;
  author?: string;
  year?: string;
  genre?: string;
  rating?: string;
};

export function BookFormScreen({ route, navigation }: Props) {
  // Pega o livro vindo nas params da rota (pode ser undefined)
  const livroExistente = route.params?.book;
  const isEdicao = !!livroExistente; // true se está editando

  // Pega as funções do Context
  const { addBook, editBook } = useBooks();

  // ------------------------------------------------------------------------
  // Estados dos campos do formulário.
  // Se está em modo de edição, pré-preenche com os valores do livro.
  // ATENÇÃO: TextInput trabalha sempre com STRING. Por isso ano e rating
  // são guardados como string aqui e convertidos no submit.
  // ------------------------------------------------------------------------
  const [title, setTitle] = useState(livroExistente?.title ?? "");
  const [author, setAuthor] = useState(livroExistente?.author ?? "");
  const [year, setYear] = useState(livroExistente?.year?.toString() ?? "");
  const [genre, setGenre] = useState(livroExistente?.genre ?? "");
  const [rating, setRating] = useState(livroExistente?.rating?.toString() ?? "0");
  const [read, setRead] = useState(livroExistente?.read ?? false);

  // Estado para guardar erros de validação
  const [errors, setErrors] = useState<FormErrors>({});

  // Estado para travar o botão durante o envio
  const [submitting, setSubmitting] = useState(false);

  // ------------------------------------------------------------------------
  // VALIDAÇÃO
  // ------------------------------------------------------------------------
  /**
   * Verifica todos os campos do formulário e devolve um objeto de erros.
   * Se o objeto estiver VAZIO, não há erros.
   */
  function validar(): FormErrors {
    const novosErros: FormErrors = {};
    const anoAtual = new Date().getFullYear();
    // title
    if (!title.trim()) {
      novosErros.title = "Título é obrigatório";
    } else if (title.trim().length < 2) {
      novosErros.title = "Título deve ter ao menos 2 caracteres";
    }
    // author
    if (!author.trim()) {
      novosErros.author = "Autor é obrigatório";
    } else if (author.trim().length < 2) {
      novosErros.author = "Autor deve ter ao menos 2 caracteres";
    }
    // year
    const yearNum = Number(year);
    if (!year.trim()) {
      novosErros.year = "Ano é obrigatório";
    } else if (isNaN(yearNum)) {
      novosErros.year = "Ano deve ser um número válido";
    } else if (yearNum < 1000 || yearNum > anoAtual) {
      novosErros.year = `Ano deve estar entre 1000 e ${anoAtual}`;
    }
    // genre
    if (!genre.trim()) {
      novosErros.genre = "Gênero é obrigatório";
    }
    // rating
    const ratingNum = Number(rating);
    if (isNaN(ratingNum)) {
      novosErros.rating = "Nota deve ser um número";
    } else if (ratingNum < 0 || ratingNum > 5) {
      novosErros.rating = "Nota deve estar entre 0 e 5";
    }
    return novosErros;
  }

  // ------------------------------------------------------------------------
  // SUBMIT
  // ------------------------------------------------------------------------
  async function handleSubmit() {
    // 1) valida primeiro
    const novosErros = validar();
    setErrors(novosErros);

    // Se houver erros, NÃO envia
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    // 2) monta o objeto BookInput convertendo os tipos certos
    const input: BookInput = {
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
      genre: genre.trim(),
      rating: Number(rating),
      read,
    };

    // 3) envia para a API através do Context
    setSubmitting(true);
    try {
      if (isEdicao && livroExistente) {
        await editBook(livroExistente.id, input);
      } else {
        await addBook(input);
      }
      navigation.goBack();
    } catch (e) {
      // Se a API recusar (ex: erro 400), mostra um alerta.
      Alert.alert("Erro", "Não foi possível salvar o livro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  // ------------------------------------------------------------------------
  // RENDERIZAÇÃO
  // ------------------------------------------------------------------------
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{isEdicao ? "Editar livro" : "Novo livro"}</Text>

      <Input
        label="Título"
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Dom Casmurro"
        error={errors.title}
      />

      <Input
        label="Autor"
        value={author}
        onChangeText={setAuthor}
        placeholder="Ex: Machado de Assis"
        error={errors.author}
      />

      <Input
        label="Ano"
        value={year}
        onChangeText={setYear}
        placeholder="Ex: 1899"
        keyboardType="numeric"
        error={errors.year}
      />

      <Input
        label="Gênero"
        value={genre}
        onChangeText={setGenre}
        placeholder="Ex: Romance"
        error={errors.genre}
      />

      <Input
        label="Nota (0 a 5)"
        value={rating}
        onChangeText={setRating}
        placeholder="0"
        keyboardType="numeric"
        error={errors.rating}
      />

      {/* Switch para o status de leitura */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Já li este livro?</Text>
        <Switch value={read} onValueChange={setRead} />
      </View>

      {/* Botão de salvar */}
      <Pressable
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Salvando..." : isEdicao ? "Salvar alterações" : "Cadastrar"}
        </Text>
      </Pressable>

      {/* Botão de cancelar */}
      <Pressable
        style={[styles.button, styles.buttonGhost]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, styles.buttonGhostText]}>Cancelar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  button: {
    backgroundColor: "#7c3aed",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#7c3aed",
  },
  buttonGhostText: {
    color: "#7c3aed",
  },
});
