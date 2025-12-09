<script setup lang="ts">
useSeoMeta({
  title: 'Products - Hydraulic Hose Co.',
  description: 'Browse our selection of hydraulic hoses, fittings, quick disconnects, and adapters.',
})

const route = useRoute()
const selectedCategory = computed(() => route.query.category as string || 'all')

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'hydraulic-hoses', name: 'Hydraulic Hoses' },
  { id: 'fittings', name: 'Fittings & Ends' },
  { id: 'quick-disconnects', name: 'Quick Disconnects' },
  { id: 'adapters', name: 'Adapters' },
  { id: 'accessories', name: 'Accessories' },
]

// Fetch products from Shopify
const { isConfigured, getProducts } = useShopify()
const loading = ref(true)
const products = ref<Array<{
  id: string
  handle: string
  name: string
  description: string
  price: number
  priceUnit: string
  image: string | null
  category: string
}>>([])

onMounted(async () => {
  if (isConfigured.value) {
    try {
      const { products: shopifyProducts } = await getProducts({ first: 50 })
      products.value = shopifyProducts.map(p => ({
        id: p.handle,
        handle: p.handle,
        name: p.title,
        description: p.description || '',
        price: parseFloat(p.priceRange.minVariantPrice.amount),
        priceUnit: p.productType?.toLowerCase().includes('hose') ? 'per foot' : 'each',
        image: p.featuredImage?.url || null,
        category: p.productType?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized',
      }))
    } catch (error) {
      console.error('Failed to fetch products from Shopify:', error)
    }
  }
  loading.value = false
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="bg-neutral-900 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">Products</h1>
        <p class="text-xl text-neutral-300">
          Quality hydraulic components for every application
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="container-custom">
        <!-- Custom Hose CTA - Top Banner -->
        <div class="mb-8 p-6 bg-accent-50 rounded-xl border border-accent-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="font-semibold text-accent-800 text-lg">Need a Custom Hose Assembly?</h3>
            <p class="text-accent-700">
              Build your exact specification with our easy-to-use configurator.
            </p>
          </div>
          <NuxtLink to="/products/custom-hose" class="btn-accent whitespace-nowrap">
            Build Custom Hose
          </NuxtLink>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="sticky top-24">
              <h2 class="text-lg font-semibold mb-4">Categories</h2>
              <nav class="space-y-2">
                <NuxtLink
                  v-for="category in categories"
                  :key="category.id"
                  :to="category.id === 'all' ? '/products' : `/products?category=${category.id}`"
                  class="block px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  :class="[
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  ]"
                >
                  {{ category.name }}
                </NuxtLink>
              </nav>
            </div>
          </aside>

          <!-- Product Grid -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-6">
              <p class="text-neutral-600">
                {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }}
              </p>
              <select class="input w-auto cursor-pointer pr-10">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
              </select>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="col-span-full flex justify-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <NuxtLink
                v-for="product in filteredProducts"
                :key="product.id"
                :to="`/products/${product.id}`"
                class="card group"
              >
                <div class="aspect-square bg-neutral-100 relative overflow-hidden">
                  <img
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                    {{ product.name }}
                  </h3>
                  <p class="text-sm text-neutral-600 mb-3">
                    {{ product.description }}
                  </p>
                  <p class="font-semibold text-primary-600">
                    ${{ product.price.toFixed(2) }}
                    <span class="text-sm font-normal text-neutral-500">{{ product.priceUnit }}</span>
                  </p>
                </div>
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && filteredProducts.length === 0" class="text-center py-16">
              <p class="text-neutral-600 mb-4">No products found in this category.</p>
              <NuxtLink to="/products" class="link">View all products</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
