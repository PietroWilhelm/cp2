# Bibliotech - Starter Project (PROVA)

App de biblioteca pessoal em **React Native + Expo + TypeScript**.
Este é o **starter project da prova**: estrutura pronta + arquivos com `// TODO:` que você precisa implementar.

---

## ⚠️ ANTES DE COMEÇAR

1. **Coloque a pasta do projeto em um caminho SEM ESPAÇOS.**
   Exemplo correto: `C:\dev\bibliotech-starter\`
   Exemplo problemático: `C:\Meus Documentos\Prova React Native\` ← espaços quebram o Node.js no Windows.

2. **Suba a API ANTES** de iniciar o app.
   A API está na pasta `api-bibliotech/`. Veja o README dela.

3. **Stack já configurada** (não mude as versões):
   - Expo SDK 51
   - React 18.2 / RN 0.74
   - React Navigation v6
   - AsyncStorage
   - axios

---

## Como rodar:

```bash
# 1) Instalar dependências
npm install

# 2) Iniciar o Expo
npm start
```

Depois é só pressionar:
- `a` para abrir no Android Emulator
- `i` para abrir no iOS Simulator
- `w` para abrir no navegador (Web)
- Ou escanear o QR code com o **Expo Go** no celular

---

## Onde ajustar o endereço da API

Arquivo: `src/config.ts`

| Cenário | URL a usar |
|---------|-----------|
| Web e iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Celular físico (Expo Go) | `http://SEU_IP_LOCAL:3000` |

---

## Estrutura do projeto

```
starter-bibliotech/
├── App.tsx                       ← navegação + provider (PRONTO)
├── src/
│   ├── config.ts                 ← URL da API (PRONTO)
│   ├── types/
│   │   └── Book.ts               ← tipos TypeScript (PRONTO)
│   ├── components/
│   │   ├── Input.tsx             ← input reutilizável (PRONTO)
│   │   └── BookCard.tsx          ← card de livro (PRONTO)
│   ├── services/
│   │   └── api.ts                ← 🔧 IMPLEMENTAR (CRUD HTTP)
│   ├── storage/
│   │   └── preferences.ts        ← 🔧 IMPLEMENTAR (AsyncStorage)
│   ├── contexts/
│   │   └── BooksContext.tsx      ← 🔧 IMPLEMENTAR (estado global)
│   └── screens/
│       ├── BookListScreen.tsx    ← parcial (filtro é TODO)
│       └── BookFormScreen.tsx    ← parcial (validação + submit são TODO)
```

---

## Roteiro sugerido de implementação

Faça **NESTA ORDEM** para conseguir testar cada peça:

1. `src/services/api.ts` — implemente as 5 funções HTTP
2. `src/contexts/BooksContext.tsx` — implemente o Provider e os métodos
3. `src/screens/BookFormScreen.tsx` — implemente `validar()` e `handleSubmit()`
4. `src/storage/preferences.ts` — implemente as funções de AsyncStorage
5. `src/screens/BookListScreen.tsx` — finalize o filtro com persistência

---

## Como testar manualmente

- **Listagem aparece com 3 livros** → API + service + Context OK
- **Cadastrar um novo livro** → POST e Context OK
- **Editar um livro existente** → PUT e Context OK
- **Excluir um livro** → DELETE e Context OK
- **Tentar salvar com campos inválidos** → mensagens de erro aparecem
- **Trocar filtro, fechar app, abrir de novo** → filtro persistido (AsyncStorage)

Boa prova! 
# cp2
