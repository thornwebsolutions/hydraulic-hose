<script setup lang="ts">
const {
  searchQuery,
  searchResults,
  isSearchOpen,
  selectedIndex,
  hasResults,
  showDropdown,
  handleKeydown,
  selectProduct,
  openSearch,
  closeSearch,
} = useSearch()

const searchInput = ref<HTMLInputElement | null>(null)
const searchContainer = ref<HTMLElement | null>(null)

// Focus input when search opens
watch(isSearchOpen, (open) => {
  if (open) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Category display names
const categoryNames: Record<string, string> = {
  'hydraulic-hoses': 'Hoses',
  'fittings': 'Fittings',
  'quick-disconnects': 'Quick Disconnects',
  'adapters': 'Adapters',
}
</script>

<template>
  <div ref="searchContainer" class="relative">
    <!-- Search Input -->
    <div class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
        @focus="openSearch"
        @keydown="handleKeydown"
      >
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <!-- Clear button -->
      <button
        v-if="searchQuery"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        @click="searchQuery = ''"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Dropdown Results -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showDropdown"
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50"
      >
        <!-- Results -->
        <div v-if="hasResults" class="max-h-80 overflow-y-auto">
          <button
            v-for="(product, index) in searchResults"
            :key="product.id"
            type="button"
            class="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-neutral-50 transition-colors"
            :class="{ 'bg-primary-50': selectedIndex === index }"
            @click="selectProduct(product)"
            @mouseenter="selectedIndex = index"
          >
            <!-- Product icon placeholder -->
            <div class="w-10 h-10 bg-neutral-100 rounded flex-shrink-0 flex items-center justify-center">
              <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-medium text-neutral-900 truncate">{{ product.name }}</p>
              <p class="text-sm text-neutral-500 truncate">{{ product.description }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                  {{ categoryNames[product.category] || product.category }}
                </span>
                <span class="text-sm font-medium text-primary-600">
                  ${{ product.price.toFixed(2) }} {{ product.priceUnit }}
                </span>
              </div>
            </div>
          </button>
        </div>

        <!-- No results -->
        <div v-else class="px-4 py-6 text-center">
          <svg class="w-8 h-8 mx-auto text-neutral-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-neutral-500 text-sm">No products found for "{{ searchQuery }}"</p>
          <p class="text-neutral-400 text-xs mt-1">Try a different search term</p>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 bg-neutral-50 border-t border-neutral-100">
          <p class="text-xs text-neutral-400">
            <span v-if="hasResults">
              Press <kbd class="px-1 py-0.5 bg-neutral-200 rounded text-neutral-600">↑</kbd>
              <kbd class="px-1 py-0.5 bg-neutral-200 rounded text-neutral-600">↓</kbd> to navigate,
              <kbd class="px-1 py-0.5 bg-neutral-200 rounded text-neutral-600">Enter</kbd> to select
            </span>
            <span v-else>
              <kbd class="px-1 py-0.5 bg-neutral-200 rounded text-neutral-600">Esc</kbd> to close
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
