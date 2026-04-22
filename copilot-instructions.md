Instrucoes usuario chat

Usar frases curtas 3-6 palavras
Sem cumprimento nem introducao
Evitar enrolacao desnecessaria
Executar ferramentas primeiro
Mostrar resultado em seguida
Parar sem narracao longa
Remover artigos nas frases
Exemplo: Eu corrigir codigo

---

## Projeto: Perfumin (B&S Beauty)

### Snapshot Atual (April 22, 2026)

Branch: development
Framework: Vue 3 + Vite + Tailwind CSS (PostCSS)
Routing: hash mode (`createWebHashHistory`)
Build: OK

### Estado Atual Codigo

1. Header possui botao vendedores

- `AppHeader.vue` suporta `showSellerBtn`
- Emite evento `open-seller`

2. Home possui acesso vendedores

- `HomeView.vue` usa `:show-seller-btn="true"`
- `@open-seller` redireciona para `seller-login`

3. Catalogo usa range novo

- `CatalogView.vue` usa `TARGET_RANGE = 'Catalogo!A:J'`
- Nao usa mais aba `Dados`

4. Catalogo tenta primary e fallback

- Lendo `VITE_PRIMARY_*` e `VITE_FALLBACK_*`
- Compatibilidade legado: `VITE_SHEET_ID` e `VITE_GOOGLE_API_KEY`

5. Diagnostico erro planilha melhorado

- Em erro de range invalido, lista abas disponiveis
- Mensagem inclui fonte `primary` ou `fallback`

6. Correcao imagens Cloudinary

- `sanitizeImageSource` normaliza valor da planilha
- Aceita `public_id` e URL completa
- Evita montar URL Cloudinary duas vezes

7. Botao voltar catalogo corrigido

- `@back="goHome"`
- Navega para rota `home`

### Rotas Atuais

- `/` -> home
- `/catalog` -> catalogo
- `/seller-login` -> login vendedor
- `/seller-panel` -> painel vendedor (guard com `sellerAuth`)

Nota: hash route persiste URL atual. Se endereco terminar em `#/catalog`, app abre catalogo.

### Variaveis Ambiente Atuais

Obrigatorias para planilha:

```
VITE_PRIMARY_SHEET_ID=
VITE_PRIMARY_GOOGLE_API_KEY=
VITE_FALLBACK_SHEET_ID=
VITE_FALLBACK_GOOGLE_API_KEY=
```

Usadas no painel vendedor/mapas:

```
VITE_SELLER_PASSWORD=
VITE_GOOGLE_MAPS_KEY=
VITE_SELLER_MAX_DISTANCE_KM=
VITE_SELLER_PLACE_TYPES=
VITE_SELLER_MIN_REVIEWS=
VITE_SELLER_MIN_RATING=
VITE_SELLER_CACHE_DURATION_HOURS=
```

### Comandos Projeto

- Dev: `npm run dev`
- Build: `npm run build`
