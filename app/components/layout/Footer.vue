<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  products: [
    { name: 'Hydraulic Hoses', href: '/products?category=hydraulic-hoses' },
    { name: 'Fittings', href: '/products?category=fittings' },
    { name: 'Quick Disconnects', href: '/products?category=quick-disconnects' },
    { name: 'Adapters', href: '/products?category=adapters' },
    { name: 'Custom Assemblies', href: '/products/custom-hose' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}
</script>

<template>
  <footer class="bg-neutral-900 text-white">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Brand column -->
        <div>
          <NuxtLink to="/" class="flex items-center space-x-2 mb-6">
            <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">H</span>
            </div>
            <span class="font-heading font-bold text-xl">
              Hydraulic Hose Co.
            </span>
          </NuxtLink>
          <p class="text-neutral-400 text-sm leading-relaxed">
            Quality hydraulic hose assemblies and fittings for industrial, agricultural, and commercial applications.
          </p>
        </div>

        <!-- Products column -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Products</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.products" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-neutral-400 hover:text-white text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company column -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Company</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-neutral-400 hover:text-white text-sm transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-neutral-800">
      <div class="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-neutral-400 text-sm">
          &copy; {{ currentYear }} Hydraulic Hose Co. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
