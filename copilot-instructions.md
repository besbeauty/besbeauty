Instruções do usuário para chat

Usar frases curtas 3-6 palavras
Sem cumprimentos nem introdução
Evitar qualquer enrolação desnecessária
Executar ferramentas primeiro
Mostrar resultado em seguida
Parar; não narrar ações
Remover artigos nas frases
Exemplo: Eu corrigir código

---

## Projeto: Perfumin (B&S Beauty)

### Estrutura Atual (April 22, 2026 - Session 2)

**Branch:** development
**Framework:** Vue 3 + Vite + Tailwind CSS (PostCSS)
**Estado:** Build ✅ | Dev Server ✅ | Logs Debug ✅

### Arquitetura Refatorada

#### Composables (src/composables/)

1. **useTheme.ts** - Gerencia tema (light/dark), injeção via App.vue
2. **useMessages.ts** - Mensagens aleatórias (22 frases "A"/PLL), randomMessage global
   - Exporta: `randomMessage`, `getRandomMessage`, `messages`
3. **useCloudinary.ts** - URLs Cloudinary, logo (100px), buildImageUrl(publicId, width)
   - Logs: `[Cloudinary] Built URL for "{publicId}" ({width}px) in {ms}ms`

#### Componentes (src/components/)

1. **AppHeader.vue** - Logo, tema toggle, título, botões condicionais
2. **AppFooter.vue** - Layouts: "home" (contatos/Instagram) ou "simple" (copyright/mensagem)
3. **ContactCard.vue** - Botão contato individual (nome/telefone)

#### Páginas (src/pages/)

- **HomeView.vue** - Usa AppHeader/AppFooter, composables
  - Logs: `[HomeView] onMounted`, `[HomeView] randomMessage: "{msg}"`
- **CatalogView.vue** - Google Sheets, carousel, cart, skeleton loading
  - ✅ Import: `const { randomMessage, getRandomMessage } = useMessages();`
  - Logs: `[CatalogView] Starting getProducts...`, `[CatalogView] Products loaded`, `[CatalogView] Image loaded`

### Build Setup (Atual)

**Tailwind CSS:**

- ✅ Removido: cdn.tailwindcss.com (development only)
- ✅ Instalado: @tailwindcss/postcss, tailwindcss, postcss, autoprefixer
- ✅ Config files: `tailwind.config.js`, `postcss.config.js`
- ✅ CSS: `src/styles/style.css` com `@tailwind base/components/utilities`

**Build Output:**

- docs/index.html (1.63 kB)
- docs/assets/index-\*.css (PostCSS compiled)
- docs/assets/index-\*.js (131+ kB gzip)

### Session 2 - Issues Resolvidos

✅ **Issue 1: getRandomMessage undefined (CatalogView)**

- Causa: Importava `randomMessage` mas não `getRandomMessage`
- Solução: Adicionado `getRandomMessage` ao import em CatalogView.vue linha 1154

✅ **Issue 2: Tailwind CDN em produção**

- Causa: index.html carregava `cdn.tailwindcss.com` (não production-ready)
- Solução:
  1. Removeu script CDN de index.html
  2. Instalou tailwindcss + @tailwindcss/postcss via npm
  3. Criou `tailwind.config.js` + `postcss.config.js`
  4. Adicionou `@tailwind` directives em `src/styles/style.css`

✅ **Issue 3: Logs de debug para Cloudinary**

- Adicionado: `console.log('[Cloudinary] Built URL...')` com performance.now()
- CatalogView logs: `[CatalogView] Starting getProducts...` + fetch/response/error logs

### Todos os Logs Implementados

```
[useMessages] Initializing random message
[Cloudinary] Built URL for "{publicId}" ({width}px) in {ms}ms: https://res.cloudinary.com/...
[HomeView] onMounted
[HomeView] randomMessage: "{message}"
[CatalogView] Starting getProducts...
[CatalogView] Trying primary sheet: configured
[CatalogView] Trying primary api key: configured
[CatalogView] Fetching primary from: https://sheets.googleapis.com/...
[CatalogView] primary response status: 200
[CatalogView] primary sheet data received, rows: N
[CatalogView] Using primary sheet as source
[CatalogView] Failed to load primary sheet: {error message}
[CatalogView] Trying fallback sheet: configured
[CatalogView] Trying fallback api key: configured
[CatalogView] Fetching fallback from: https://sheets.googleapis.com/...
[CatalogView] fallback response status: 200
[CatalogView] fallback sheet data received, rows: N
[CatalogView] Using fallback sheet as source
[CatalogView] Products loaded successfully: N items
[CatalogView] Image loaded: {imageId}
[CatalogView] Image failed to load: {imageId}
[CatalogView] Error in getProducts: {error message}
```

### Environment Variables Necessários

**Desenvolvimento (.env.local):**

```
VITE_PRIMARY_SHEET_ID=tua_sheet_id_principal
VITE_PRIMARY_GOOGLE_API_KEY=tua_api_key_principal
VITE_FALLBACK_SHEET_ID=tua_sheet_id_fallback
VITE_FALLBACK_GOOGLE_API_KEY=tua_api_key_fallback
```

**Produção (GitHub Secrets):**

- `VITE_PRIMARY_SHEET_ID`
- `VITE_PRIMARY_GOOGLE_API_KEY`
- `VITE_FALLBACK_SHEET_ID`
- `VITE_FALLBACK_GOOGLE_API_KEY`

### Git Status

- Branch: development
- Build: ✅ Sucesso (sem erros TypeScript/Vue)
- Dev Server: ✅ Rodando em http://localhost:5177/besbeauty/
