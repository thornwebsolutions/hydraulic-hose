<script setup lang="ts">
import { useLocalCart } from '~/stores/localCart'

useSeoMeta({
  title: 'Shopping Cart - Hydraulic Hose Co.',
  description: 'Review your cart and proceed to checkout.',
})

const cart = useLocalCart()
const toast = useToast()

// Initialize cart on mount
onMounted(() => {
  cart.initCart()
})

const updateQuantity = (itemId: string, newQuantity: number) => {
  if (newQuantity > 0) {
    cart.updateQuantity(itemId, newQuantity)
  }
}

const updateLength = (itemId: string, newLength: number) => {
  if (newLength > 0) {
    cart.updateLength(itemId, newLength)
  }
}

const removeItem = (itemId: string) => {
  cart.removeItem(itemId)
  toast.info('Item removed from cart')
}

const clearCart = () => {
  cart.clearCart()
  toast.info('Cart cleared')
}

const proceedToCheckout = () => {
  // Will redirect to Shopify checkout when connected
  toast.info('Checkout will be available once Shopify is connected')
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

    <!-- Cart Content -->
    <section class="py-12">
      <div class="container-custom">
        <div v-if="cart.items.length > 0" class="flex flex-col lg:flex-row gap-8">
          <!-- Cart Items -->
          <div class="flex-1">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div
                v-for="(item, index) in cart.items"
                :key="item.id"
                class="p-4 sm:p-6"
                :class="{ 'border-t border-neutral-200': index > 0 }"
              >
                <!-- Mobile: stacked layout, Desktop: row layout -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <!-- Top row on mobile: image + details -->
                  <div class="flex gap-4 flex-1">
                    <!-- Product Image Placeholder -->
                    <div class="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-sm sm:text-base mb-1 line-clamp-2">{{ item.name }}</h3>
                      <div class="text-xs sm:text-sm text-neutral-600">
                        <p v-if="item.priceUnit === 'per foot' && item.length">
                          {{ item.length }} ft @ ${{ item.price.toFixed(2) }}/ft
                        </p>
                        <p v-else>
                          ${{ item.price.toFixed(2) }} {{ item.priceUnit }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom row on mobile: price + controls -->
                  <div class="flex items-center justify-between sm:justify-end gap-4 sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <!-- Price -->
                    <p class="font-semibold text-base sm:text-lg">${{ item.totalPrice.toFixed(2) }}</p>

                    <!-- Controls -->
                    <div class="flex items-center gap-2">
                      <!-- Per-foot items: length control -->
                      <div v-if="item.priceUnit === 'per foot'" class="flex items-center gap-1 sm:gap-2">
                        <label class="text-xs sm:text-sm text-neutral-600">Length:</label>
                        <input
                          type="number"
                          :value="item.length"
                          min="1"
                          step="0.5"
                          class="input py-1 px-2 w-16 sm:w-20 text-xs sm:text-sm"
                          @change="updateLength(item.id, Number(($event.target as HTMLInputElement).value))"
                        >
                        <span class="text-xs sm:text-sm text-neutral-600">ft</span>
                      </div>

                      <!-- Per-item products: quantity control -->
                      <div v-else class="flex items-center gap-1 sm:gap-2">
                        <label class="text-xs sm:text-sm text-neutral-600">Qty:</label>
                        <select
                          :value="item.quantity"
                          class="input py-1 px-2 w-14 sm:w-16 text-xs sm:text-sm"
                          @change="updateQuantity(item.id, Number(($event.target as HTMLSelectElement).value))"
                        >
                          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                        </select>
                      </div>

                      <!-- Remove button -->
                      <button
                        type="button"
                        class="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium ml-2"
                        @click="removeItem(item.id)"
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
              <button
                type="button"
                class="text-neutral-500 hover:text-neutral-700 text-sm"
                @click="clearCart"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <!-- Order Summary -->
          <aside class="lg:w-80 flex-shrink-0">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-24">
              <h2 class="font-semibold text-lg mb-4">Order Summary</h2>

              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-600">Subtotal ({{ cart.itemCount }} items)</span>
                  <span>${{ cart.subtotal.toFixed(2) }}</span>
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
                  <span>${{ cart.subtotal.toFixed(2) }}</span>
                </div>
              </div>

              <button
                type="button"
                class="btn-primary w-full"
                @click="proceedToCheckout"
              >
                Proceed to Checkout
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
