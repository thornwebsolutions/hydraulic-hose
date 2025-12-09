<script setup lang="ts">
const route = useRoute()
const { totalQuantity, initCart } = useCart()

// Initialize cart on mount
onMounted(() => {
  initCart()
})

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Build Custom Hose', href: '/products/custom-hose' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
</script>

<template>
  <header class="bg-white border-b border-neutral-200 sticky top-0 z-50">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-18">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">H</span>
          </div>
          <span class="font-heading font-bold text-xl text-neutral-900">
            Hydraulic Hose Co.
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium transition-colors duration-200"
            :class="[
              isActive(item.href)
                ? 'text-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Search (Desktop) -->
          <div class="hidden md:block w-64">
            <UiSearchBar />
          </div>

          <!-- Search (Mobile - icon only, opens modal) -->
          <button
            type="button"
            class="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Search"
            @click="mobileSearchOpen = true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Cart -->
          <NuxtLink
            to="/cart"
            class="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Shopping cart"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              v-if="totalQuantity > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs font-medium rounded-full flex items-center justify-center"
            >
              {{ totalQuantity > 9 ? '9+' : totalQuantity }}
            </span>
          </NuxtLink>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden border-t border-neutral-200 py-4"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-base font-medium transition-colors duration-200"
            :class="[
              isActive(item.href)
                ? 'text-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Mobile Search Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileSearchOpen"
          class="fixed inset-0 z-50 bg-black/50"
          @click="mobileSearchOpen = false"
        >
          <div
            class="bg-white p-4"
            @click.stop
          >
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <UiSearchBar />
              </div>
              <button
                type="button"
                class="p-2 text-neutral-500 hover:text-neutral-700"
                @click="mobileSearchOpen = false"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
