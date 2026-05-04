// ============================================================================
// CONFIGURAÇÕES GLOBAIS DO APP
// ============================================================================
// Centralize aqui valores que podem mudar entre ambientes (dev, prod, etc).
// Em projetos reais, costuma-se usar variáveis de ambiente (.env).
// ============================================================================

import { Platform } from "react-native";

/**
 * URL base da API.
 *
 * IMPORTANTE: O endereço do "localhost" muda dependendo de ONDE o app roda:
 *
 *  - Web (expo start --web)       → http://localhost:3000
 *  - iOS Simulator                → http://localhost:3000
 *  - Android Emulator             → http://10.0.2.2:3000  (alias do localhost da máquina)
 *  - Celular físico (Expo Go)     → http://SEU_IP_NA_REDE:3000  (ex: 192.168.0.10)
 *
 * Para descobrir seu IP na rede:
 *   Windows : ipconfig
 *   Linux/macOS : ifconfig (ou ip addr)
 *
 * Se estiver testando no celular físico, troque a string abaixo pelo seu IP.
 */
export const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000" // Android Emulator
    : "http://localhost:3000"; // iOS Simulator e Web

// 👇 Se você for usar celular físico, COMENTE as linhas acima e DESCOMENTE:
// export const API_BASE_URL = "http://192.168.0.10:3000";
