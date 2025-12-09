<script setup lang="ts">
useSeoMeta({
  title: 'Shopping Cart - Hydraulic Hose Co.',
  description: 'Review your cart and proceed to checkout.',
})

const {
  cartLines,
  totalQuantity,
  subtotal,
  total,
  isLoading,
  initCart,
  updateCartLine,
  removeFromCart,
  goToCheckout,
} = useCart()

const toast = useToast()

// Initialize cart on mount
onMounted(() => {
  initCart()
})

const updateQuantity = async (lineId: string, newQuantity: number) => {
  if (newQuantity > 0) {
    try {
      await updateCartLine(lineId, newQuantity)
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }
}

const removeItem = async (lineId: string) => {
  try {
    await removeFromCart(lineId)
    toast.info('Item removed from cart')
  } catch (error) {
    toast.error('Failed to remove item')
  }
}

const proceedToCheckout = () => {
  goToCheckout()
}

// Helper to get length attribute from cart line
const getLength = (line: any) => {
  const lengthAttr = line.attributes?.find((a: any) => a.key === 'Length (ft)')
  return lengthAttr ? lengthAttr.value : null
}

// Helper to get product image
const getImage = (line: any) => {
  return line.merchandise?.product?.featuredImage?.url || null
}

// Helper to get product title
const getTitle = (line: any) => {
  const productTitle = line.merchandise?.product?.title || 'Product'
  const variantTitle = line.merchandise?.title
  if (variantTitle && variantTitle !== 'Default Title') {
    return `${productTitle} - ${variantTitle}`
  }
  return productTitle
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Page Header -->
    <section class="bg-neutral-900 text-white py-12">
      <div class="container-custom">
        <h1 class="text-3xl font-bold">Shopping Cart</h1>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="isLoading && cartLines.length === 0" class="py-20">
      <div class="container-custom flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    </section>

    <!-- Cart Content -->
    <section v-else class="py-12">
      <div class="container-custom">
        <div v-if="cartLines.length > 0" class="flex flex-col lg:flex-row gap-8">
          <!-- Cart Items -->
          <div class="flex-1">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div
                v-for="(line, index) in cartLines"
                :key="line.id"
                class="p-4 sm:p-6"
                :class="{ 'border-t border-neutral-200': index > 0 }"
              >
                <!-- Mobile: stacked layout, Desktop: row layout -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <!-- Top row on mobile: image + details -->
                  <div class="flex gap-4 flex-1">
                    <!-- Product Image -->
                    <div class="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        v-if="getImage(line)"
                        :src="getImage(line)"
                        :alt="getTitle(line)"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-sm sm:text-base mb-1 line-clamp-2">
                        {{ getTitle(line) }}
                      </h3>
                      <div class="text-xs sm:text-sm text-neutral-600">
                        <p v-if="getLength(line)">
                          Length: {{ getLength(line) }} ft
                        </p>
                        <p>Qty: {{ line.quantity }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom row on mobile: price + controls -->
                  <div class="flex items-center justify-between sm:justify-end gap-4 sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <!-- Price -->
                    <p class="font-semibold text-base sm:text-lg">
                      ${{ parseFloat(line.cost.totalAmount.amount).toFixed(2) }}
                    </p>

                    <!-- Controls -->
                    <div class="flex items-center gap-2">
                      <!-- Quantity control -->
                      <div class="flex items-center gap-1 sm:gap-2">
                        <label class="text-xs sm:text-sm text-neutral-600">Qty:</label>
                        <select
                          :value="line.quantity"
                          :disabled="isLoading"
                          class="input py-1 px-2 w-14 sm:w-16 text-xs sm:text-sm disabled:opacity-50"
                          @change="updateQuantity(line.id, Number(($event.target as HTMLSelectElement).value))"
                        >
                          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                        </select>
                      </div>

                      <!-- Remove button -->
                      <button
                        type="button"
                        class="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium ml-2 disabled:opacity-50"
                        :disabled="isLoading"
                        @click="removeItem(line.id)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-between items-center">
              <NuxtLink to="/products" class="link text-sm">
                &larr; Continue Shopping
              </NuxtLink>
            </div>
          </div>

          <!-- Order Summary -->
          <aside class="lg:w-80 flex-shrink-0">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-24">
              <h2 class="font-semibold text-lg mb-4">Order Summary</h2>

              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Subtotal ({{ totalQuantity }} items)</span>
                  <span>${{ parseFloat(subtotal).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Shipping</span>
                  <span class="text-neutral-500">Calculated at checkout</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Tax</span>
                  <span class="text-neutral-500">Calculated at checkout</span>
                </div>
              </div>

              <div class="border-t border-neutral-200 pt-4 mb-6">
                <div class="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${{ parseFloat(total).toFixed(2) }}</span>
                </div>
              </div>

              <button
                type="button"
                class="btn-primary w-full disabled:opacity-50"
                :disabled="isLoading"
                @click="proceedToCheckout"
              >
                <span v-if="isLoading" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Loading...
                </span>
                <span v-else>Proceed to Checkout</span>
              </button>

              <p class="text-xs text-neutral-500 text-center mt-4">
                Secure checkout powered by Shopify
              </p>
            </div>
          </aside>
        </div>

        <!-- Empty Cart -->
        <div v-else class="text-center py-16">
          <div class="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p class="text-neutral-600 mb-6">Add some products to get started.</p>
          <NuxtLink to="/products" class="btn-primary">
            Browse Products
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
