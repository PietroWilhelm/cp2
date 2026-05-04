// ============================================================================
// APP PRINCIPAL
// ============================================================================
// Aqui configuramos:
//   1) NAVEGAÇÃO (React Navigation com Stack Navigator)
//   2) BOOKS PROVIDER (envolve toda a árvore para compartilhar o estado)
//
// Hierarquia de componentes:
//
//   <BooksProvider>           ← fornece o Context para tudo que está dentro
//     <NavigationContainer>   ← raiz da navegação
//       <Stack.Navigator>
//         <Stack.Screen name="BookList" />
//         <Stack.Screen name="BookForm" />
//       </Stack.Navigator>
//     </NavigationContainer>
//   </BooksProvider>
//
// Esse arquivo já está PRONTO. Você não precisa editar.
// ============================================================================

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { BooksProvider } from "./src/contexts/BooksContext";
import { BookFormScreen } from "./src/screens/BookFormScreen";
import { BookListScreen } from "./src/screens/BookListScreen";
import type { Book } from "./src/types/Book";

// ----------------------------------------------------------------------------
// TIPAGEM DAS ROTAS
// ----------------------------------------------------------------------------
// Esse tipo descreve QUE rotas existem e QUE parâmetros cada uma recebe.
// Exportamos para que cada tela possa importar e tipar corretamente
// suas props (route.params, navigation.navigate(...)).
//
// BookList:                não recebe parâmetros (undefined)
// BookForm: { book?: Book }  pode receber um livro (modo edição) ou nada (criar)
export type RootStackParamList = {
  BookList: undefined;
  BookForm: { book?: Book };
};

// Cria o stack navigator já com a tipagem
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <BooksProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BookList"
          screenOptions={{
            headerStyle: { backgroundColor: "#1a1a2e" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "700" },
          }}
        >
          <Stack.Screen
            name="BookList"
            component={BookListScreen}
            options={{ title: "Bibliotech" }}
          />
          <Stack.Screen
            name="BookForm"
            component={BookFormScreen}
            options={{ title: "Livro" }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </BooksProvider>
  );
}
