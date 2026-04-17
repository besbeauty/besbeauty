<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <header
      class="app-header w-full"
      :class="theme === 'white' ? 'bg-[#f3f3f3]' : 'bg-[#0a0c10]'"
    >
      <div class="flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <img
          :src="logoUrl"
          alt="B&S Beauty Logo"
          class="h-20 w-20 object-contain cursor-pointer transition-opacity hover:opacity-80"
          @click="$emit('back')"
        />

        <!-- Center Title -->
        <div class="flex flex-col items-center leading-none">
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
            class="font-headline text-xs md:text-sm tracking-wider uppercase"
          >
            B&S Beauty
          </span>
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
            class="font-headline text-lg md:text-2xl lg:text-3xl tracking-wider uppercase"
          >
            Catálogo
          </span>
        </div>

        <!-- Right Buttons -->
        <div class="flex items-center gap-4">
          <button
            @click="$emit('back')"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <button
            @click="toggleTheme"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined text-lg">{{
              theme === 'white' ? 'light_mode' : 'dark_mode'
            }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Skeleton Loading LinkedIn style -->
    <div v-if="isLoadingProducts" class="mb-12 px-4 sm:px-8 lg:px-12 pb-6 pt-8">
      <div
        :class="
          theme === 'white'
            ? 'bg-gradient-to-r from-amber-100 to-amber-200'
            : 'bg-gradient-to-r from-pink-900/30 to-pink-800/40'
        "
        class="h-8 w-40 rounded mx-auto mb-6 animate-pulse"
      />

      <div class="relative">
        <div class="flex gap-4 overflow-x-auto py-4 px-4">
          <div v-for="i in 4" :key="`skeleton-${i}`" class="flex-shrink-0">
            <div
              :class="
                (theme === 'white'
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100'
                  : 'bg-gradient-to-br from-pink-900/20 to-pink-800/30') +
                ' rounded-xl shadow-lg overflow-hidden w-auto min-w-48 flex flex-col'
              "
            >
              <!-- Skeleton Image -->
              <div
                :class="
                  theme === 'white'
                    ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                    : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                "
                class="w-full h-40 animate-pulse"
              />

              <!-- Skeleton Content -->
              <div class="flex-1 p-4 flex flex-col justify-between">
                <div class="space-y-3">
                  <div
                    :class="
                      theme === 'white'
                        ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                        : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                    "
                    class="h-4 w-3/4 rounded animate-pulse"
                  />
                  <div
                    :class="
                      theme === 'white'
                        ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                        : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                    "
                    class="h-3 w-1/2 rounded animate-pulse"
                  />
                  <div
                    :class="
                      theme === 'white'
                        ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                        : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                    "
                    class="h-3 w-2/3 rounded animate-pulse"
                  />
                </div>

                <div class="flex items-end justify-between mt-4">
                  <div
                    :class="
                      theme === 'white'
                        ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                        : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                    "
                    class="h-6 w-20 rounded animate-pulse"
                  />
                  <div class="flex gap-1">
                    <div
                      :class="
                        theme === 'white'
                          ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                          : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                      "
                      class="h-8 w-8 rounded animate-pulse"
                    />
                    <div
                      :class="
                        theme === 'white'
                          ? 'bg-gradient-to-r from-amber-200 to-amber-100'
                          : 'bg-gradient-to-r from-pink-800/30 to-pink-700/20'
                      "
                      class="h-8 w-8 rounded animate-pulse"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section
      v-if="!isLoadingProducts"
      v-for="(list, idx) in lists"
      :key="idx"
      class="mb-12 pb-6 px-[5%]"
      :class="
        (idx === 0 ? 'pt-8' : '') +
        ' ' +
        (theme === 'white'
          ? 'border-b border-amber-200'
          : 'border-b border-pink-900/30')
      "
    >
      <h3
        :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
        class="text-2xl font-semibold mb-6 text-center"
      >
        {{ list.title }}
      </h3>

      <div class="flex items-center justify-center gap-4">
        <!-- Left Arrow Container - always takes space -->
        <div class="w-8 h-8">
          <button
            v-if="needsScroll(idx) && canScrollLeft(idx)"
            @click="scrollCarousel(idx, 'left')"
            :class="
              theme === 'white'
                ? 'bg-amber-200 hover:bg-amber-300 text-amber-800'
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            "
            class="w-full h-full p-1 rounded-full shadow-lg transition-colors flex items-center justify-center"
            title="Anterior"
          >
            <span class="material-symbols-outlined text-lg">arrow_back</span>
          </button>
        </div>

        <!-- Carousel - 70% -->
        <div class="w-[70%]">
          <div
            :ref="(el) => setContainer(el, idx)"
            @scroll="updateScrollPositions(idx)"
            class="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-thin"
            :class="
              theme === 'white' ? 'scrollbar-amber-300' : 'scrollbar-pink-500'
            "
          >
            <div
              v-for="item in list.items"
              :key="item.id"
              class="flex-shrink-0 group"
            >
              <!-- Card -->
              <div
                :class="
                  (theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]') +
                  ' rounded-xl shadow-lg overflow-hidden w-auto min-w-48 flex flex-col transition-transform hover:scale-105'
                "
              >
                <!-- Image container -->
                <div
                  class="relative w-full h-40 overflow-hidden bg-gray-200 flex items-center justify-center"
                >
                  <!-- Skeleton -->
                  <div
                    v-if="!imageLoadingState[item.id]"
                    class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
                  />

                  <img
                    v-if="item.image?.trim()"
                    :src="item.image"
                    alt="Perfume"
                    @load="onImageLoad(item.id)"
                    @error="onImageError(item.id)"
                    class="w-full h-full object-cover relative z-10"
                  />
                  <div v-else class="text-center px-4 relative z-10">
                    <p
                      :class="
                        theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                      "
                      class="text-sm font-medium"
                    >
                      Imagem será disponibilizada em breve
                    </p>
                  </div>
                </div>
                <!-- Info + Details button -->
                <div class="flex-1 p-4 flex flex-col justify-between relative">
                  <div>
                    <h4
                      :class="theme === 'white' ? 'text-black' : 'text-white'"
                      class="font-semibold text-sm"
                    >
                      {{ item.nome }}
                    </h4>
                    <p
                      :class="
                        theme === 'white' ? 'text-amber-600' : 'text-pink-300'
                      "
                      class="text-xs font-semibold mt-1"
                    >
                      {{ item.tipo }} • {{ item.categoria }}
                    </p>
                    <p
                      :class="
                        theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                      "
                      class="text-xs capitalize mt-1"
                    >
                      {{ item.genero }}
                    </p>
                  </div>
                  <div class="flex items-end justify-between">
                    <p
                      :class="[
                        theme === 'white' ? 'text-amber-600' : 'text-pink-300',
                        isSobConsultaProduct(item)
                          ? 'cursor-pointer hover:opacity-70 transition-opacity'
                          : '',
                      ]"
                      class="text-lg font-bold"
                      @click.stop="
                        isSobConsultaProduct(item) &&
                        (addToCart(item), (showCartModal = true))
                      "
                      :title="
                        isSobConsultaProduct(item)
                          ? 'Clique para adicionar ao carrinho'
                          : ''
                      "
                    >
                      {{ getPriceLabel(item) }}
                    </p>
                    <div class="flex items-center gap-1">
                      <button
                        @click.stop="toggleCartItem(item)"
                        :class="
                          isInCart(item)
                            ? theme === 'white'
                              ? 'text-red-600 hover:text-red-700'
                              : 'text-red-400 hover:text-red-300'
                            : theme === 'white'
                              ? 'text-sky-700 hover:text-sky-800'
                              : 'text-sky-300 hover:text-sky-200'
                        "
                        class="p-1"
                        :title="
                          isInCart(item)
                            ? 'Remover do carrinho'
                            : 'Adicionar ao carrinho'
                        "
                      >
                        <span class="material-symbols-outlined text-lg">
                          {{
                            isInCart(item)
                              ? 'remove_shopping_cart'
                              : 'add_shopping_cart'
                          }}
                        </span>
                      </button>
                      <button
                        @click.stop="selectedProduct = item"
                        :class="
                          theme === 'white'
                            ? 'text-amber-600 hover:text-amber-700'
                            : 'text-pink-300 hover:text-pink-400'
                        "
                        class="p-1"
                        title="Ver detalhes"
                      >
                        <span class="material-symbols-outlined text-lg"
                          >info</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Arrow Container - always takes space -->
        <div class="w-8 h-8">
          <button
            v-if="needsScroll(idx) && canScrollRight(idx)"
            @click="scrollCarousel(idx, 'right')"
            :class="
              theme === 'white'
                ? 'bg-amber-200 hover:bg-amber-300 text-amber-800'
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            "
            class="w-full h-full p-1 rounded-full shadow-lg transition-colors flex items-center justify-center"
            title="Próximo"
          >
            <span class="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Ver todos button -->
    <div class="text-center mt-12 pb-6">
      <button
        @click="showFilters = true"
        :class="
          theme === 'white'
            ? 'px-8 py-3 bg-amber-200 text-amber-900 rounded-full'
            : 'px-8 py-3 bg-pink-600 text-black rounded-full'
        "
        class="font-bold uppercase text-sm"
      >
        Ver todos os perfumes
      </button>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showError"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-xl p-6 w-full max-w-sm"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-2xl text-red-500"
            >error</span
          >
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-lg font-bold"
          >
            Erro desconhecido
          </h2>
        </div>
        <p
          :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
          class="mb-6"
        >
          {{ errorMessage || 'Não conseguimos carregar os produtos.' }}
        </p>
        <button
          @click="showError = false"
          :class="
            theme === 'white'
              ? 'w-full px-4 py-2 bg-amber-200 text-amber-900 rounded-full'
              : 'w-full px-4 py-2 bg-pink-600 text-black rounded-full'
          "
          class="font-semibold"
        >
          Fechar
        </button>
      </div>
    </div>
    <div
      v-if="showFilters"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4"
      @click="showFilters = false"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="w-full h-full md:h-auto md:max-h-[92vh] md:max-w-6xl overflow-y-auto rounded-none md:rounded-xl p-6"
        @click.stop
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-2xl font-bold"
          >
            Filtrar
          </h2>
          <button
            @click="showFilters = false"
            class="p-2 rounded-full"
            :class="
              theme === 'white' ? 'hover:bg-gray-100' : 'hover:bg-[#0a0c10]'
            "
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-2"
            >Pesquisar</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nome do perfume..."
              :class="
                theme === 'white'
                  ? 'bg-gray-50 text-black border-gray-300'
                  : 'bg-[#0a0c10] text-white border-gray-600'
              "
              class="w-full px-3 py-2 border rounded-lg"
            />
            <!-- Autocomplete -->
            <div
              v-if="searchSuggestions.length > 0"
              :class="
                theme === 'white'
                  ? 'bg-white border-gray-300'
                  : 'bg-[#0a0c10] border-gray-600'
              "
              class="absolute top-full left-0 right-0 border rounded-lg mt-1 z-10"
            >
              <div
                v-for="(sugg, i) in searchSuggestions"
                :key="i"
                @click="searchQuery = sugg"
                :class="
                  theme === 'white'
                    ? 'text-black hover:bg-gray-100'
                    : 'text-white hover:bg-gray-800'
                "
                class="px-3 py-2 cursor-pointer"
              >
                {{ sugg }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <button
            @click="showAdvancedFilters = !showAdvancedFilters"
            :class="
              theme === 'white'
                ? 'w-full px-4 py-3 bg-gray-100 text-black rounded-lg border border-gray-300'
                : 'w-full px-4 py-3 bg-[#0a0c10] text-white rounded-lg border border-gray-600'
            "
            class="flex items-center justify-between text-sm font-semibold"
          >
            <span>Filtro avançado</span>
            <span class="material-symbols-outlined text-base">
              {{ showAdvancedFilters ? 'expand_less' : 'expand_more' }}
            </span>
          </button>
        </div>

        <div v-if="showAdvancedFilters">
          <!-- Price Range -->
          <div class="mb-6">
            <label
              :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
              class="block text-sm font-semibold mb-2"
              >Faixa de Preço</label
            >
            <div class="flex gap-2 items-center">
              <div class="flex-1">
                <span
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                  >De</span
                >
                <input
                  v-model.number="priceMin"
                  type="number"
                  :class="
                    theme === 'white'
                      ? 'bg-gray-50 text-black border-gray-300'
                      : 'bg-[#0a0c10] text-white border-gray-600'
                  "
                  class="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <span
                :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                class="mt-4"
                >a</span
              >
              <div class="flex-1">
                <span
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                  >Até</span
                >
                <input
                  v-model.number="priceMax"
                  type="number"
                  :class="
                    theme === 'white'
                      ? 'bg-gray-50 text-black border-gray-300'
                      : 'bg-[#0a0c10] text-white border-gray-600'
                  "
                  class="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
            <div
              :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
              class="text-sm mt-2"
            >
              R$ {{ priceMin.toFixed(2).replace('.', ',') }} - R$
              {{ priceMax.toFixed(2).replace('.', ',') }}
            </div>
          </div>

          <!-- Genre Filters -->
          <div class="mb-6">
            <label
              :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
              class="block text-sm font-semibold mb-3"
              >Gênero</label
            >
            <div class="space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="filterFeminino"
                  type="checkbox"
                  class="w-4 h-4 rounded"
                />
                <span :class="theme === 'white' ? 'text-black' : 'text-white'"
                  >Feminino</span
                >
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="filterMasculino"
                  type="checkbox"
                  class="w-4 h-4 rounded"
                />
                <span :class="theme === 'white' ? 'text-black' : 'text-white'"
                  >Masculino</span
                >
              </label>
            </div>
          </div>

          <!-- Destaque Filter -->
          <div class="mb-6">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="filterDestaque"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span
                :class="theme === 'white' ? 'text-black' : 'text-white'"
                class="text-sm font-semibold"
                >Apenas em destaque</span
              >
            </label>
          </div>

          <!-- Tipo Filter -->
          <div class="mb-6">
            <label
              :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
              class="block text-sm font-semibold mb-3"
              >Tipo</label
            >
            <select
              v-model="filterTipo"
              :class="
                theme === 'white'
                  ? 'bg-gray-50 text-black border-gray-300'
                  : 'bg-[#0a0c10] text-white border-gray-600'
              "
              class="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">Todos</option>
              <option
                v-for="tipo in [
                  ...new Set(allProducts.map((p) => p.tipo).filter(Boolean)),
                ]"
                :key="tipo"
                :value="tipo"
              >
                {{ tipo }}
              </option>
            </select>
          </div>

          <!-- Categoria Filter -->
          <div class="mb-6">
            <label
              :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
              class="block text-sm font-semibold mb-3"
              >Categoria</label
            >
            <select
              v-model="filterCategoria"
              :class="
                theme === 'white'
                  ? 'bg-gray-50 text-black border-gray-300'
                  : 'bg-[#0a0c10] text-white border-gray-600'
              "
              class="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">Todos</option>
              <option
                v-for="cat in [
                  ...new Set(
                    allProducts.map((p) => p.categoria).filter(Boolean),
                  ),
                ]"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- ML Filter -->
          <div class="mb-6">
            <label
              :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
              class="block text-sm font-semibold mb-3"
              >ML</label
            >
            <select
              v-model="filterML"
              :class="
                theme === 'white'
                  ? 'bg-gray-50 text-black border-gray-300'
                  : 'bg-[#0a0c10] text-white border-gray-600'
              "
              class="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">Todos</option>
              <option
                v-for="ml in [
                  ...new Set(allProducts.map((p) => p.ml).filter(Boolean)),
                ]"
                :key="ml"
                :value="ml"
              >
                {{ ml }}
              </option>
            </select>
          </div>
        </div>

        <!-- Results -->
        <div class="mb-6">
          <div
            :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
            class="text-sm"
          >
            {{ filteredProducts.length }} produto(s) encontrado(s)
          </div>
        </div>

        <!-- Results Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            :class="theme === 'white' ? 'bg-gray-50' : 'bg-[#0a0c10]'"
            class="rounded-lg p-3"
          >
            <div
              :class="theme === 'white' ? 'bg-gray-200' : 'bg-gray-700'"
              class="w-full h-20 rounded mb-2 overflow-hidden cursor-pointer relative"
              @click="selectedProduct = item"
            >
              <!-- Skeleton -->
              <div
                v-if="!imageLoadingState[`carousel-${item.id}`]"
                class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
              />

              <img
                :src="item.image"
                alt=""
                @load="onImageLoad(`carousel-${item.id}`)"
                @error="onImageError(`carousel-${item.id}`)"
                class="w-full h-full object-cover relative z-10"
              />
            </div>
            <h4
              :class="theme === 'white' ? 'text-black' : 'text-white'"
              class="text-xs font-semibold line-clamp-1"
            >
              {{ item.nome }}
            </h4>
            <p
              :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
              class="text-xs"
            >
              {{ item.tipo }} • {{ item.categoria }}
            </p>
            <p
              :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
              class="text-xs capitalize"
            >
              {{ item.genero }}
            </p>
            <p
              :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
              class="text-sm font-bold"
            >
              {{ getPriceLabel(item) }}
            </p>
            <div class="mt-2 flex gap-2">
              <button
                @click="selectedProduct = item"
                :class="
                  theme === 'white'
                    ? 'flex-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full'
                    : 'flex-1 px-2 py-1 bg-pink-900/40 text-pink-300 rounded-full'
                "
                class="text-[11px] font-semibold"
              >
                Detalhes
              </button>
              <button
                @click="toggleCartItem(item)"
                :class="
                  isInCart(item)
                    ? theme === 'white'
                      ? 'flex-1 px-2 py-1 bg-red-100 text-red-700 rounded-full'
                      : 'flex-1 px-2 py-1 bg-red-900/40 text-red-300 rounded-full'
                    : theme === 'white'
                      ? 'flex-1 px-2 py-1 bg-sky-100 text-sky-800 rounded-full'
                      : 'flex-1 px-2 py-1 bg-sky-400 text-[#0a0c10] rounded-full'
                "
                class="text-[11px] font-semibold"
              >
                {{ isInCart(item) ? 'Remover' : '+ Carrinho' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            @click="clearFilters"
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-gray-200 text-black rounded-full'
                : 'flex-1 px-4 py-2 bg-gray-700 text-white rounded-full'
            "
            class="text-sm font-semibold"
          >
            Limpar
          </button>
          <button
            @click="showFilters = false"
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-amber-200 text-amber-900 rounded-full'
                : 'flex-1 px-4 py-2 bg-pink-600 text-black rounded-full'
            "
            class="text-sm font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div
      v-if="selectedProduct"
      @click="selectedProduct = null"
      :class="theme === 'white' ? 'bg-black/50' : 'bg-black/70'"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div
        @click.stop
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Image -->
        <div
          class="w-full h-64 overflow-hidden relative bg-gray-200 dark:bg-gray-700"
        >
          <!-- Skeleton -->
          <div
            v-if="!imageLoadingState[`detail-${selectedProduct?.id}`]"
            class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
          />

          <img
            :src="selectedProduct.image"
            alt=""
            @load="onImageLoad(`detail-${selectedProduct?.id}`)"
            @error="onImageError(`detail-${selectedProduct?.id}`)"
            class="w-full h-full object-cover relative z-10"
          />
        </div>

        <!-- Content -->
        <div class="p-6">
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-2xl font-semibold mb-2"
          >
            {{ selectedProduct.nome }}
          </h2>

          <div
            :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
            class="text-sm mb-4 space-y-1"
          >
            <p><strong>Tipo:</strong> {{ selectedProduct.tipo }}</p>
            <p><strong>Categoria:</strong> {{ selectedProduct.categoria }}</p>
            <p><strong>Gênero:</strong> {{ selectedProduct.genero }}</p>
          </div>

          <div
            class="border-t border-b py-4 mb-4"
            :class="theme === 'white' ? 'border-gray-300' : 'border-gray-600'"
          >
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  Código
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.codigo }}
                </p>
              </div>
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  ML
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.ml }}
                </p>
              </div>
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  Quantidade em estoque
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.quantidade }}
                </p>
              </div>
            </div>
          </div>

          <p
            :class="[
              theme === 'white' ? 'text-amber-600' : 'text-pink-300',
              isSobConsultaProduct(selectedProduct)
                ? 'cursor-pointer hover:opacity-70 transition-opacity'
                : '',
            ]"
            class="text-3xl font-bold mb-6"
            @click="
              isSobConsultaProduct(selectedProduct) &&
              (addToCart(selectedProduct), (showCartModal = true))
            "
            :title="
              isSobConsultaProduct(selectedProduct)
                ? 'Clique para adicionar ao carrinho'
                : ''
            "
          >
            {{ getPriceLabel(selectedProduct) }}
          </p>

          <button
            @click="toggleCartItem(selectedProduct)"
            :class="
              isInCart(selectedProduct)
                ? theme === 'white'
                  ? 'w-full px-4 py-3 mb-3 bg-red-100 text-red-800 rounded-full'
                  : 'w-full px-4 py-3 mb-3 bg-red-900/40 text-red-300 rounded-full'
                : theme === 'white'
                  ? 'w-full px-4 py-3 mb-3 bg-sky-100 text-sky-800 rounded-full'
                  : 'w-full px-4 py-3 mb-3 bg-sky-400 text-[#0a0c10] rounded-full'
            "
            class="font-semibold"
          >
            {{
              isInCart(selectedProduct)
                ? 'Remover do carrinho'
                : 'Adicionar ao carrinho'
            }}
          </button>

          <button
            @click="showCartModal = true"
            :class="
              theme === 'white'
                ? 'w-full px-4 py-3 mb-3 bg-sky-100 text-sky-800 rounded-full'
                : 'w-full px-4 py-3 mb-3 bg-sky-400 text-[#0a0c10] rounded-full'
            "
            class="font-semibold"
          >
            Ver carrinho e enviar lista
          </button>

          <button
            @click="selectedProduct = null"
            :class="
              theme === 'white'
                ? 'w-full px-4 py-3 bg-amber-200 text-amber-900 rounded-full'
                : 'w-full px-4 py-3 bg-pink-600 text-black rounded-full'
            "
            class="font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>

    <button
      @click="showCartModal = true"
      :class="
        theme === 'white'
          ? 'fixed bottom-5 right-5 z-40 bg-sky-100 text-sky-800'
          : 'fixed bottom-5 right-5 z-40 bg-sky-400 text-[#0a0c10]'
      "
      class="rounded-full shadow-lg px-4 py-3 flex items-center gap-2 font-semibold"
      title="Abrir carrinho"
    >
      <span class="material-symbols-outlined">shopping_cart</span>
      <span>{{ cartTotalQuantity }}</span>
    </button>

    <!-- Cart Modal -->
    <div
      v-if="showCartModal"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-[58] p-4"
      @click="showCartModal = false"
    >
      <div
        @click.stop
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h3
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-2xl font-semibold"
          >
            Carrinho ({{ cartTotalQuantity }})
          </h3>
          <button
            @click="showCartModal = false"
            class="p-2 rounded-full"
            :class="
              theme === 'white' ? 'hover:bg-gray-100' : 'hover:bg-[#0a0c10]'
            "
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <label
          v-if="cartItems.length > 0"
          :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
          class="block text-sm font-semibold mb-2"
        >
          Seu nome
        </label>
        <input
          v-if="cartItems.length > 0"
          v-model="cartName"
          type="text"
          placeholder="Digite seu nome"
          :class="
            theme === 'white'
              ? 'bg-gray-50 text-black border-gray-300'
              : 'bg-[#0a0c10] text-white border-gray-600'
          "
          class="w-full px-3 py-2 border rounded-lg mb-4"
        />
        <p v-if="cartNameError" class="text-red-500 text-xs mb-4">
          {{ cartNameError }}
        </p>

        <div v-if="cartItems.length === 0" class="py-10 text-center">
          <p :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'">
            Seu carrinho está vazio. Use o botão + nos produtos para montar sua
            lista.
          </p>
        </div>

        <div v-else class="space-y-3 mb-6">
          <div
            v-for="item in cartItems"
            :key="item.id"
            :class="theme === 'white' ? 'bg-gray-50' : 'bg-[#0a0c10]'"
            class="rounded-xl p-3"
          >
            <div class="flex items-start gap-3 mb-3">
              <div
                class="relative w-16 h-16 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0"
              >
                <!-- Skeleton -->
                <div
                  v-if="!imageLoadingState[`cart-${item.id}`]"
                  class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
                />

                <img
                  :src="item.image"
                  alt=""
                  @load="onImageLoad(`cart-${item.id}`)"
                  @error="onImageError(`cart-${item.id}`)"
                  class="w-16 h-16 rounded object-cover relative z-10"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold text-sm truncate"
                >
                  {{ item.nome }}
                </p>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  {{ item.categoria }} • {{ item.codigo || 'Sem código' }} •
                  {{ item.ml || '-' }}
                </p>
                <p
                  :class="
                    theme === 'white' ? 'text-amber-600' : 'text-pink-300'
                  "
                  class="text-sm font-bold"
                >
                  {{ getPriceLabel(item) }}
                </p>
              </div>
              <button
                @click="removeFromCart(item.id)"
                :class="theme === 'white' ? 'text-red-600' : 'text-red-400'"
                class="p-1"
                title="Remover"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>

            <div
              class="flex items-center gap-2 bg-gray-200/50 dark:bg-gray-700/30 p-2 rounded"
            >
              <label
                :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
                class="text-xs font-semibold"
              >
                Qtd:
              </label>
              <input
                :value="cartQuantities[item.id] || 0"
                @input="updateCartQuantity(item.id, $event.target.value)"
                type="number"
                min="1"
                :max="10"
                :class="
                  theme === 'white'
                    ? 'bg-white text-black border-gray-300'
                    : 'bg-[#0a0c10] text-white border-gray-600'
                "
                class="w-16 px-2 py-1 border rounded text-center text-sm"
              />
              <div
                v-if="
                  !isSobConsultaProduct(item) &&
                  (cartQuantities[item.id] || 0) > (item.quantidade || 999)
                "
                :class="theme === 'white' ? 'text-amber-700' : 'text-amber-300'"
                class="text-xs mt-2 ml-2"
              >
                Temos {{ item.quantidade }}
                {{ item.quantidade === 1 ? 'unidade' : 'unidades' }} disponível
                para pronta entrega 💖 Mais unidades sob encomenda.
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="cartItems.length > 0"
          class="flex items-center justify-between mb-5"
        >
          <span :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            >Total</span
          >
          <span
            :class="theme === 'white' ? 'text-amber-700' : 'text-pink-300'"
            class="text-xl font-bold"
          >
            {{ cartTotalLabel }}
          </span>
        </div>

        <div class="flex gap-2">
          <button
            @click="clearCart"
            :disabled="cartItems.length === 0"
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-gray-200 text-black rounded-full disabled:opacity-50'
                : 'flex-1 px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50'
            "
            class="text-sm font-semibold"
          >
            Limpar carrinho
          </button>
          <button
            @click="sendCartMessage"
            :disabled="cartItems.length === 0 || !isCartValid"
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-sky-100 text-sky-800 rounded-full disabled:opacity-50'
                : 'flex-1 px-4 py-2 bg-sky-400 text-[#0a0c10] rounded-full disabled:opacity-50'
            "
            class="text-sm font-semibold"
          >
            Enviar lista para vendedora
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, watch } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

const emit = defineEmits(['back']);
const theme = inject('theme');
const toggleTheme = inject('toggleTheme');

// All products data
const allProducts = ref([]);
const selectedProduct = ref(null);

// Home page lists (categoria-based destaques only)
const categories = [
  'Brand Collection',
  'Hidratante',
  'Arabic Collection',
  'Árabes Originais',
  "Victoria's Secret",
];
const lists = computed(() => {
  return categories.map((categoria) => ({
    title: categoria,
    items: allProducts.value.filter(
      (p) => p.categoria === categoria && p.destaque,
    ),
  }));
});

// Filter state
const showFilters = ref(false);
const showError = ref(false);
const isLoadingProducts = ref(true);
const infoMessageFading = ref(false);
const errorMessage = ref('');
const searchQuery = ref('');
const priceMin = ref(0);
const priceMax = ref(500);
const filterFeminino = ref(false);
const filterMasculino = ref(false);
const filterDestaque = ref(false);
const filterTipo = ref('');
const filterCategoria = ref('');
const filterML = ref('');
const showAdvancedFilters = ref(false);
const showContactModal = ref(false);
const showCartModal = ref(false);
const contactTargetProduct = ref(null);
const contactMode = ref('product');
const contactName = ref('');
const contactNameError = ref('');
const contactQuantity = ref(1);
const contactQuantityError = ref('');
const cartName = ref('');
const cartNameError = ref('');
const cartQuantities = ref({});
const cartItems = ref([]);
const imageLoadingState = ref({});
const SELLER_PHONES = ['5511947758048', '5511970489098'];
const CONTACT_COMPLIMENTS = [
  'Ta muito lindo!',
  'O site ficou maravilhoso!',
  'Ficou lindo demais!',
  'Que site incrivel, parabens!',
  'Ta super elegante!',
  'Ficou chique e muito bem feito!',
  'Ta impecavel!',
  'Ficou encantador!',
  'Ta bonito de verdade!',
  'O visual ficou sensacional!',
  'Ficou moderno e muito bonito!',
  'Ta caprichado demais!',
  'Ficou um charme!',
  'Ta maravilhoso de navegar!',
  'Ficou de encher os olhos!',
  'Ta lindo e super profissional!',
  'Ficou top demais!',
  'Ta um arraso!',
  'Ficou perfeito!',
  'Ta bonito, leve e elegante!',
  'Ficou muito bem organizado e lindo!',
  'Ta com cara de marca grande!',
  'Ficou clean e sofisticado!',
  'Ta surreal de bonito!',
  'Ficou lindo, parabens pelo capricho!',
  'Ta com um visual premium!',
  'Ficou bonito demais, serio!',
  'Ta estiloso e muito agradavel!',
  'Ficou diferenciado e muito bonito!',
  'Ta simplesmente espetacular!',
];
const SPECIAL_TRIGGER_NAME = 'Hoje é meu aniversário!!!';
const SPECIAL_BIRTHDAY_MESSAGE =
  'Feliz aniversáio, família, me diverti muito fazendo esse presente, que só não é meu favorito porque tem o quadro de Pretty Little Liars. Espero que ajude você a ficar com muitos dinheiros e você pague meu apartamento. Parabéns <3';

function clearFilters() {
  searchQuery.value = '';
  priceMin.value = 0;
  priceMax.value = 500;
  filterFeminino.value = false;
  filterMasculino.value = false;
  filterDestaque.value = false;
  filterTipo.value = '';
  filterCategoria.value = '';
  filterML.value = '';
}

// Cloudinary setup
const CLOUD_NAME = 'dsxdphuim';
const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

function buildImageUrl(publicId, width) {
  return cld
    .image(publicId)
    .resize(scale().width(width))
    .format('auto')
    .quality('auto')
    .toURL();
}

const logoUrl = computed(() => buildImageUrl('logo_crop_qoc5ff', 100));

function isNumericPrice(price) {
  return typeof price === 'number' && Number.isFinite(price);
}

function formatPrice(price) {
  return Number(price || 0)
    .toFixed(2)
    .replace('.', ',');
}

function getPriceLabel(product) {
  if (!product) return 'Sob Consulta';

  if (isNumericPrice(product.preco)) {
    return `R$ ${formatPrice(product.preco)}`;
  }

  const raw = product.precoRaw?.toString().trim() || '';
  return raw || 'Sob Consulta';
}

function isSobConsultaProduct(product) {
  if (!product) return false;
  if (product.sobConsulta === true) return true;
  return getPriceLabel(product).toLowerCase() === 'sob consulta';
}

function getRandomSellerPhone() {
  const index = Math.floor(Math.random() * SELLER_PHONES.length);
  return SELLER_PHONES[index];
}

function getRandomCompliment() {
  const index = Math.floor(Math.random() * CONTACT_COMPLIMENTS.length);
  return CONTACT_COMPLIMENTS[index];
}

const cartTotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) =>
      sum +
      (isNumericPrice(item.preco)
        ? item.preco * (cartQuantities.value[item.id] || 0)
        : 0),
    0,
  );
});

const cartHasNumericPrices = computed(() => {
  return cartItems.value.some((item) => isNumericPrice(item.preco));
});

const cartTotalLabel = computed(() => {
  if (!cartHasNumericPrices.value) return 'Sob Consulta';
  return `R$ ${formatPrice(cartTotal.value)}`;
});

const cartTotalQuantity = computed(() => {
  return Object.values(cartQuantities.value).reduce((sum, qty) => sum + qty, 0);
});

const isCartValid = computed(() => {
  return cartName.value.trim() !== '';
});

function isInCart(product) {
  return cartItems.value.some((item) => item.id === product?.id);
}

function addToCart(product) {
  if (!product || isInCart(product)) return;
  cartItems.value.push(product);
  cartQuantities.value[product.id] = 1;
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  delete cartQuantities.value[productId];
}

function toggleCartItem(product) {
  if (!product) return;
  if (isInCart(product)) {
    removeFromCart(product.id);
    return;
  }
  addToCart(product);
}

function clearCart() {
  cartItems.value = [];
  cartQuantities.value = {};
  cartName.value = '';
  cartNameError.value = '';
}

function updateCartQuantity(itemId, value) {
  const qty = parseInt(value) || 0;
  cartQuantities.value[itemId] = qty;
}

function sendCartMessage() {
  const sanitizedName = cartName.value?.trim();

  if (!sanitizedName) {
    cartNameError.value = 'Por favor, informe seu nome.';
    return;
  }

  cartNameError.value = '';

  if (cartName.value === SPECIAL_TRIGGER_NAME) {
    const sellerPhone = getRandomSellerPhone();
    const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(SPECIAL_BIRTHDAY_MESSAGE)}`;
    window.open(url, '_blank');
    closeCartModal();
    return;
  }

  const compliment = getRandomCompliment();
  const message = [
    `Olá, meu nome é ${sanitizedName}. Eu vim pelo site https://besbeauty.netlify.app/ (${compliment}) e tenho interesse nesses produtos:`,
    '',
    ...cartItems.value.flatMap((item, index) => {
      const quantity = cartQuantities.value[item.id] || 0;
      const isSobConsulta = isSobConsultaProduct(item);
      const hasQuantity = quantity > 0;

      const lines = [
        `${index + 1}. ${item.nome || '-'}`,
        `Categoria: ${item.categoria || '-'}`,
        `Código: ${item.codigo || '-'}`,
        `ML: ${item.ml || '-'}`,
      ];

      if (isSobConsulta && hasQuantity) {
        lines.push(`Vocês têm ${quantity} unidade(s) disponível(is)?`);
      } else if (!isSobConsulta && hasQuantity) {
        lines.push(`Quantidade desejada: ${quantity}`);
      }

      lines.push(`Preço Unitário: ${getPriceLabel(item)}`);
      lines.push('');

      return lines;
    }),
    cartHasNumericPrices.value
      ? `Total parcial (itens com preço informado): R$ ${formatPrice(cartTotal.value)}`
      : 'Total da lista: Sob Consulta',
  ].join('\n');

  const sellerPhone = getRandomSellerPhone();
  const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  closeCartModal();
}

function closeCartModal() {
  showCartModal.value = false;
  cartNameError.value = '';
}

function openContactModal(product = null, mode = 'product') {
  if (mode === 'cart' && cartItems.value.length === 0) return;

  contactMode.value = mode;
  contactTargetProduct.value = product;
  contactName.value = '';
  contactNameError.value = '';
  contactQuantity.value = 1;
  contactQuantityError.value = '';
  showContactModal.value = true;
}

function closeContactModal() {
  showContactModal.value = false;
  contactTargetProduct.value = null;
  contactMode.value = 'product';
  contactName.value = '';
  contactNameError.value = '';
  contactQuantity.value = 1;
  contactQuantityError.value = '';
}

function contactSeller(product, customerName, mode = 'product', quantity = 1) {
  const sanitizedName = customerName?.trim();

  if (!sanitizedName) return;

  if (mode === 'product' && !product) return;

  if (mode === 'cart' && cartItems.value.length === 0) return;

  if (customerName === SPECIAL_TRIGGER_NAME) {
    const sellerPhone = getRandomSellerPhone();
    const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(SPECIAL_BIRTHDAY_MESSAGE)}`;
    window.open(url, '_blank');
    return;
  }

  if (mode === 'product' && isSobConsultaProduct(product)) {
    const message = `Olá, meu nome é ${sanitizedName}, gostaria de saber o valor do ${product.nome}`;
    const sellerPhone = getRandomSellerPhone();
    const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return;
  }

  const compliment = getRandomCompliment();
  const message =
    mode === 'cart'
      ? [
          `Olá, meu nome é ${sanitizedName}. Eu vim pelo site BeSBeauty (${compliment}) e tenho interesse nesses produtos:`,
          '',
          ...cartItems.value.flatMap((item, index) => [
            `${index + 1}. ${item.nome || '-'}`,
            `Categoria: ${item.categoria || '-'}`,
            `Código: ${item.codigo || '-'}`,
            `ML: ${item.ml || '-'}`,
            `Preço Unitário: ${getPriceLabel(item)}`,
            '',
          ]),
          cartHasNumericPrices.value
            ? `Total parcial (itens com preço informado): R$ ${formatPrice(cartTotal.value)}`
            : 'Total da lista: Sob Consulta',
        ].join('\n')
      : [
          `Olá, meu nome é ${sanitizedName}. Eu vim pelo site BeSBeauty (${compliment}) e estou interessado nesse ${product.nome}.`,
          '',
          `Categoria: ${product.categoria || '-'}`,
          `Código: ${product.codigo || '-'}`,
          `Nome: ${product.nome || '-'}`,
          `ML: ${product.ml || '-'}`,
          `Quantidade desejada: ${quantity}`,
          `Preço Unitário: ${getPriceLabel(product)}`,
        ].join('\n');

  const sellerPhone = getRandomSellerPhone();
  const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function submitContact() {
  const typedName = contactName.value;
  const sanitizedName = typedName?.trim();

  if (!sanitizedName) {
    contactNameError.value = 'Por favor, informe seu nome.';
    return;
  }

  contactNameError.value = '';

  if (
    contactMode.value === 'product' &&
    !isSobConsultaProduct(contactTargetProduct.value)
  ) {
    const qty = parseInt(contactQuantity.value) || 1;
    const maxQty = contactTargetProduct.value?.quantidade || 1;
    if (qty < 1) {
      contactQuantityError.value = 'Quantidade deve ser pelo menos 1.';
      return;
    }
    if (qty > maxQty) {
      contactQuantityError.value = `Quantidade máxima em estoque: ${maxQty}`;
      return;
    }
    contactQuantityError.value = '';
  }

  contactSeller(
    contactTargetProduct.value,
    typedName,
    contactMode.value,
    contactQuantity.value,
  );
  closeContactModal();
}

const filteredProducts = computed(() => {
  return allProducts.value.filter((p) => {
    // Search by name
    if (
      searchQuery.value &&
      !p.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
      return false;

    // Price range
    if (
      isNumericPrice(p.preco) &&
      (p.preco < priceMin.value || p.preco > priceMax.value)
    )
      return false;

    // Gender filters
    if (filterFeminino.value && p.genero?.toLowerCase() !== 'feminino')
      return false;
    if (filterMasculino.value && p.genero?.toLowerCase() !== 'masculino')
      return false;

    // Destaque filter
    if (filterDestaque.value && !p.destaque) return false;

    // Tipo filter
    if (filterTipo.value && p.tipo !== filterTipo.value) return false;

    // Categoria filter
    if (filterCategoria.value && p.categoria !== filterCategoria.value)
      return false;

    // ML filter
    if (filterML.value && p.ml !== filterML.value) return false;

    return true;
  });
});

const searchSuggestions = computed(() => {
  if (!searchQuery.value) return [];
  return allProducts.value
    .map((p) => p.nome)
    .filter((name) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5);
});

const containers = ref([]);
const scrollPositions = ref({});

function setContainer(el, idx) {
  if (!containers.value) containers.value = [];
  containers.value[idx] = el;
}

function updateScrollPositions(idx) {
  const container = containers.value[idx];
  if (!container) return;

  if (!scrollPositions.value) scrollPositions.value = {};
  scrollPositions.value[idx] = {
    scrollLeft: container.scrollLeft,
    scrollWidth: container.scrollWidth,
    clientWidth: container.clientWidth,
  };
}

function needsScroll(idx) {
  const pos = scrollPositions.value[idx];
  return pos && pos.scrollWidth > pos.clientWidth;
}

function canScrollLeft(idx) {
  const pos = scrollPositions.value[idx];
  return pos && pos.scrollLeft > 0;
}

function canScrollRight(idx) {
  const pos = scrollPositions.value[idx];
  return pos && pos.scrollLeft + pos.clientWidth < pos.scrollWidth - 10;
}

function scrollCarousel(idx, direction) {
  const container = containers.value[idx];
  if (!container) return;

  // ~3 items scroll (cada card é min-w-48 + gap-4 = ~208px)
  const scrollAmount = 600;
  if (direction === 'left') {
    container.scrollLeft -= scrollAmount;
  } else {
    container.scrollLeft += scrollAmount;
  }

  // Update positions after scroll
  setTimeout(() => updateScrollPositions(idx), 0);
}

// Drag to scroll
const isDragging = ref(false);
const dragStart = ref(0);
const scrollStart = ref(0);
const dragElement = ref(null);

function startDrag(e) {
  isDragging.value = true;
  dragStart.value = e.clientX;
  scrollStart.value = e.currentTarget.scrollLeft;
  dragElement.value = e.currentTarget;
}

function onDrag(e) {
  if (!isDragging.value || !dragElement.value) return;
  const delta = e.clientX - dragStart.value;
  dragElement.value.scrollLeft = scrollStart.value - delta;
}

function endDrag() {
  isDragging.value = false;
  dragElement.value = null;
}

async function getProducts() {
  try {
    const SHEET_ID = import.meta.env.VITE_SHEET_ID;
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    if (!SHEET_ID) {
      throw new Error('SHEET_ID não configurado. Verifique seu .env.local');
    }

    if (!API_KEY || API_KEY === 'YOUR_PUBLIC_API_KEY_HERE') {
      throw new Error(
        'Google API Key não configurada. Você precisa criar uma API Key pública no Google Cloud Console e adicionar ao .env.local',
      );
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Dados!A:J?key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const sheetData = await response.json();

    if (sheetData.error) {
      throw new Error(`API Error: ${sheetData.error.message}`);
    }

    const rows = sheetData.values || [];
    if (rows.length < 2) {
      throw new Error('Planilha vazia ou sem dados');
    }

    const data = rows.slice(1).map((row, i) => {
      const rawImageId = row[9]?.trim() || '';
      const priceRaw = row[6]?.toString().trim() || '';
      const normalized = priceRaw.toLowerCase();
      const numericCandidate = priceRaw
        .replace(/r\$/gi, '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
      const parsed = Number.parseFloat(numericCandidate);
      const hasNumericPrice = Number.isFinite(parsed);

      return {
        id: i,
        tipo: row[0]?.trim() || 'Sem tipo',
        categoria: row[1]?.trim() || 'Sem categoria',
        genero: row[2]?.trim() || 'Unissexo',
        codigo: row[3]?.trim() || '',
        nome: row[4]?.trim() || 'Sem nome',
        ml: row[5]?.trim() || '',
        preco: hasNumericPrice ? parsed : null,
        precoRaw: priceRaw,
        sobConsulta: !priceRaw || normalized === 'sob consulta',
        quantidade: parseInt(row[7]) || 0,
        destaque: row[8]?.trim().toLowerCase() === 'sim',
        image: buildImageUrl(rawImageId, 300),
      };
    });

    allProducts.value = data;
  } catch (e) {
    showError.value = true;
    errorMessage.value = e.message || 'Erro desconhecido ao carregar produtos';
  } finally {
    isLoadingProducts.value = false;
  }
}

onMounted(() => {
  // Scroll para o topo da página
  window.scrollTo(0, 0);

  // Carregar produtos imediatamente
  getProducts();

  // Carregar nome salvo do localStorage
  const savedName = localStorage.getItem('cartUserName');
  if (savedName) {
    cartName.value = savedName;
  }
});

// Initialize scroll positions when products load
watch(allProducts, () => {
  setTimeout(() => {
    containers.value.forEach((container, idx) => {
      if (container) updateScrollPositions(idx);
    });
  }, 100);
});

// Rastrear carregamento de imagens
function onImageLoad(imageId) {
  imageLoadingState.value[imageId] = true;
}

function onImageError(imageId) {
  imageLoadingState.value[imageId] = true;
}

// Salvar nome no localStorage quando mudar
watch(cartName, (newName) => {
  if (newName.trim()) {
    localStorage.setItem('cartUserName', newName);
  }
});
</script>

<style scoped>
/* Scrollbar customizado */
.scrollbar-amber-300::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-amber-300::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-amber-300::-webkit-scrollbar-thumb {
  background: #fcd34d;
  border-radius: 2px;
}
.scrollbar-amber-300::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

.scrollbar-pink-500::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-pink-500::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-pink-500::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 2px;
}
.scrollbar-pink-500::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}

/* Toast transitions */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
