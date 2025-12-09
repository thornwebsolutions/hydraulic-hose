<script setup lang="ts">
import type { ShopifyProduct } from '~/types/shopify'

const route = useRoute()
const toast = useToast()
const { getProductByHandle } = useShopify()
const { addToCart: addToShopifyCart, initCart, isLoading: cartLoading } = useCart()

const productHandle = computed(() => route.params.id as string)

// Fetch product from Shopify
const loading = ref(true)
const shopifyProduct = ref<ShopifyProduct | null>(null)

// Get the first variant ID for add to cart
const selectedVariantId = computed(() => {
  if (!shopifyProduct.value) return null
  return shopifyProduct.value.variants.edges[0]?.node.id || null
})

// Transformed product for template compatibility
const product = computed(() => {
  if (!shopifyProduct.value) return null
  const p = shopifyProduct.value
  return {
    id: p.handle,
    name: p.title,
    description: p.description,
    longDescription: p.descriptionHtml ? p.description : p.description,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    priceUnit: p.productType?.toLowerCase().includes('hose') ? 'per foot' : 'each',
    image: p.featuredImage?.url || null,
    variants: p.variants.edges.map(e => e.node),
    specs: [], // Could be populated from metafields
  }
})

// SEO
useSeoMeta({
  title: () => product.value ? `${product.value.name} - Hydraulic Hose Co.` : 'Product Not Found',
  description: () => product.value?.description || '',
})

// For 'each' items - quantity selector
const quantity = ref(1)

// For 'per foot' items - length selector
const length = ref(6) // Default 6 feet

// Check if product is priced per foot
const isPerFoot = computed(() => product.value?.priceUnit === 'per foot')

// Calculate total price
const totalPrice = computed(() => {
  if (!product.value) return 0
  if (isPerFoot.value) {
    return product.value.price * length.value
  }
  return product.value.price * quantity.value
})

const addToCart = async () => {
  if (!product.value || !selectedVariantId.value) return

  try {
    await addToShopifyCart([{
      merchandiseId: selectedVariantId.value,
      quantity: isPerFoot.value ? 1 : quantity.value,
      // Store length as an attribute for per-foot items
      ...(isPerFoot.value && {
        attributes: [{ key: 'Length (ft)', value: String(length.value) }]
      })
    }])

    // Show toast notification
    if (isPerFoot.value) {
      toast.success(`Added ${length.value} ft of ${product.value.name} to cart`)
    } else {
      toast.success(`Added ${quantity.value} x ${product.value.name} to cart`)
    }
  } catch (error) {
    toast.error('Failed to add to cart')
    console.error('Add to cart error:', error)
  }
}

// Fetch product on mount
onMounted(async () => {
  initCart()
  try {
    shopifyProduct.value = await getProductByHandle(productHandle.value)
  } catch (error) {
    console.error('Failed to fetch product:', error)
  }
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <template v-if="loading">
      <section class="py-20">
        <div class="container-custom flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    </template>

    <!-- Product Found -->
    <template v-else-if="product">
      <!-- Breadcrumb -->
      <div class="bg-neutral-50 border-b border-neutral-200">
        <div class="container-custom py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/" class="text-neutral-500 hover:text-neutral-700">Home</NuxtLink>
            <span class="text-neutral-400">/</span>
            <NuxtLink to="/products" class="text-neutral-500 hover:text-neutral-700">Products</NuxtLink>
            <span class="text-neutral-400">/</span>
            <span class="text-neutral-900">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Product Detail -->
      <section class="py-12">
        <div class="container-custom">
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Product Image -->
            <div>
              <div class="aspect-square bg-neutral-100 rounded-xl overflow-hidden relative">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <div class="text-center">
                    <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm">Product Image</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div>
              <div class="mb-6">
                <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
                <p class="text-lg text-neutral-600">{{ product.description }}</p>
              </div>

              <!-- Price -->
              <div class="mb-6">
                <p class="text-3xl font-bold text-primary-600">
                  ${{ product.price.toFixed(2) }}
                  <span class="text-lg font-normal text-neutral-500">{{ product.priceUnit }}</span>
                </p>
              </div>

              <!-- Per-Foot Length Selector -->
              <div v-if="isPerFoot" class="mb-6">
                <label class="block text-sm font-medium text-neutral-700 mb-2">
                  Length (feet)
                </label>
                <div class="flex items-center gap-4">
                  <div class="flex items-center">
                    <button
                      type="button"
                      class="w-10 h-10 rounded-l-lg border border-r-0 border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                      @click="length = Math.max(1, length - 1)"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      v-model.number="length"
                      type="number"
                      min="1"
                      max="100"
                      step="0.5"
                      class="w-20 h-10 border border-neutral-300 text-center focus:outline-none focus:border-primary-500"
                    >
                    <button
                      type="button"
                      class="w-10 h-10 rounded-r-lg border border-l-0 border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                      @click="length++"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <span class="text-neutral-600">feet</span>
                </div>

                <!-- Calculated Total -->
                <div class="mt-4 p-4 bg-primary-50 rounded-lg">
                  <div class="flex justify-between items-center">
                    <span class="text-neutral-700">
                      {{ length }} ft × ${{ product.price.toFixed(2) }}/ft
                    </span>
                    <span class="text-xl font-bold text-primary-600">
                      ${{ totalPrice.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quantity Selector (for 'each' items) -->
              <div v-else class="mb-6">
                <label class="block text-sm font-medium text-neutral-700 mb-2">
                  Quantity
                </label>
                <div class="flex items-center">
                  <button
                    type="button"
                    class="w-10 h-10 rounded-l-lg border border-r-0 border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                    @click="quantity = Math.max(1, quantity - 1)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    class="w-16 h-10 border border-neutral-300 text-center focus:outline-none focus:border-primary-500"
                  >
                  <button
                    type="button"
                    class="w-10 h-10 rounded-r-lg border border-l-0 border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                    @click="quantity++"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Add to Cart Button -->
              <button
                type="button"
                class="btn-primary w-full mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="cartLoading"
                @click="addToCart"
              >
                <span v-if="cartLoading" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
                <span v-else>Add to Cart - ${{ totalPrice.toFixed(2) }}</span>
              </button>

              <!-- Long Description -->
              <div class="mb-8">
                <h2 class="text-lg font-semibold mb-3">Description</h2>
                <div class="text-neutral-600 whitespace-pre-line">
                  {{ product.longDescription?.trim() }}
                </div>
              </div>

              <!-- Technical Specifications -->
              <div v-if="product.specs?.length">
                <h2 class="text-lg font-semibold mb-3">Technical Specifications</h2>
                <div class="bg-neutral-50 rounded-lg overflow-hidden">
                  <div
                    v-for="(spec, index) in product.specs"
                    :key="spec.label"
                    class="flex"
                    :class="{ 'border-t border-neutral-200': index > 0 }"
                  >
                    <div class="w-1/3 px-4 py-3 font-medium bg-neutral-100">
                      {{ spec.label }}
                    </div>
                    <div class="w-2/3 px-4 py-3">
                      {{ spec.value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Hose CTA -->
      <section class="py-12">
        <div class="container-custom">
          <div class="bg-accent-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 class="text-xl font-semibold text-accent-800 mb-2">Need a Custom Hose Assembly?</h2>
              <p class="text-accent-700">
                Build your exact specification with our easy-to-use configurator.
              </p>
            </div>
            <NuxtLink to="/products/custom-hose" class="btn-accent whitespace-nowrap">
              Build Custom Hose
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>

    <!-- Product Not Found -->
    <template v-else>
      <section class="py-20">
        <div class="container-custom text-center">
          <h1 class="text-3xl font-bold mb-4">Product Not Found</h1>
          <p class="text-neutral-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <NuxtLink to="/products" class="btn-primary">
            Browse Products
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>
