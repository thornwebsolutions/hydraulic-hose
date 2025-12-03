// Search composable
// Uses centralized product data from useProducts

import { allProducts, type Product } from './useProducts'

export const useSearch = () => {
  const searchQuery = ref('')
  const isSearchOpen = ref(false)
  const selectedIndex = ref(-1)
  const isLoading = ref(false)

  // Category display names
  const categoryNames: Record<string, string> = {
    'hydraulic-hoses': 'Hoses',
    'fittings': 'Fittings',
    'quick-disconnects': 'Quick Disconnects',
    'adapters': 'Adapters',
  }

  // Search results from centralized products
  const searchResults = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()

    if (!query || query.length < 2) {
      return []
    }

    return allProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }).slice(0, 6) // Limit to 6 results
  })

  const hasResults = computed(() => searchResults.value.length > 0)
  const showDropdown = computed(() => isSearchOpen.value && searchQuery.value.length >= 2)

  // Keyboard navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (!showDropdown.value) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        selectedIndex.value = Math.min(
          selectedIndex.value + 1,
          searchResults.value.length - 1
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
        break
      case 'Enter':
        event.preventDefault()
        if (selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
          selectProduct(searchResults.value[selectedIndex.value])
        }
        break
      case 'Escape':
        closeSearch()
        break
    }
  }

  const selectProduct = (product: Product) => {
    navigateTo(`/products/${product.id}`)
    closeSearch()
  }

  const openSearch = () => {
    isSearchOpen.value = true
  }

  const closeSearch = () => {
    isSearchOpen.value = false
    searchQuery.value = ''
    selectedIndex.value = -1
  }

  const getCategoryName = (category: string): string => {
    return categoryNames[category] || category
  }

  // Reset selected index when results change
  watch(searchResults, () => {
    selectedIndex.value = -1
  })

  return {
    searchQuery,
    searchResults,
    isSearchOpen,
    selectedIndex,
    isLoading,
    hasResults,
    showDropdown,
    handleKeydown,
    selectProduct,
    openSearch,
    closeSearch,
    getCategoryName,
  }
}
