// ============================================================================
// COMPONENTE: INPUT
// ============================================================================
// Componente de input reutilizável com label e mensagem de erro embutidos.
// Encapsula o TextInput do React Native + estilos consistentes.
//
// Esse componente JÁ ESTÁ PRONTO. Você não precisa editar.
// Use-o nos formulários para reduzir código repetido.
// ============================================================================

import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label: string;
  error?: string; // mensagem de erro, se houver
};

export function Input({ label, error, style, ...rest }: InputProps) {
  // Lógica simples: se tem erro, a borda fica vermelha.
  const hasError = !!error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        // Junta estilo padrão + estilo de erro (se houver) + estilo customizado
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor="#888"
        {...rest}
      />

      {/* Só renderiza a mensagem de erro se ela existir */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1a1a2e",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#1a1a2e",
  },
  inputError: {
    borderColor: "#e63946",
  },
  errorText: {
    color: "#e63946",
    fontSize: 12,
    marginTop: 4,
  },
});
