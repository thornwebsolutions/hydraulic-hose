<script setup lang="ts">
useSeoMeta({
  title: 'Hydraulic Hose Co. - Custom Hose Assemblies & Fittings',
  description: 'Build custom hydraulic hose assemblies online. Quality hoses, fittings, and adapters for industrial, agricultural, and commercial applications.',
})

const categories = [
  {
    name: 'Hydraulic Hoses',
    description: 'High-pressure hoses for demanding applications',
    image: '/images/categories/hydraulic-hoses.jpg',
    href: '/products?category=hydraulic-hoses',
  },
  {
    name: 'Fittings & Ends',
    description: 'Crimp, field-attachable, and specialty fittings',
    image: '/images/categories/fittings.jpg',
    href: '/products?category=fittings',
  },
  {
    name: 'Quick Disconnects',
    description: 'ISO-standard quick couplers for fast connections',
    image: '/images/categories/quick-disconnects.jpg',
    href: '/products?category=quick-disconnects',
  },
  {
    name: 'Adapters',
    description: 'Thread adapters in steel, stainless, and brass',
    image: '/images/categories/adapters.jpg',
    href: '/products?category=adapters',
  },
]

const features = [
  {
    title: 'Custom Assemblies',
    description: 'Build your exact hose specification with our online configurator',
    icon: 'wrench',
  },
  {
    title: 'Quality Materials',
    description: 'Premium hoses and fittings from trusted manufacturers',
    icon: 'shield',
  },
  {
    title: 'Fast Shipping',
    description: 'Most orders ship within 24-48 hours',
    icon: 'truck',
  },
  {
    title: 'Expert Support',
    description: 'Technical assistance when you need it',
    icon: 'support',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-neutral-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-900/80" />
      <div class="container-custom relative py-24 lg:py-32">
        <div class="max-w-2xl">
          <h1 class="text-balance mb-6">
            Custom Hydraulic Hose Assemblies Made Easy
          </h1>
          <p class="text-xl text-neutral-300 mb-8 leading-relaxed">
            Build your perfect hose assembly online. Select your hose type, length, and fittings with our easy-to-use configurator.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/products/custom-hose" class="btn-accent">
              Build Custom Hose
            </NuxtLink>
            <NuxtLink to="/products" class="btn-outline border-white text-white hover:bg-white/10">
              Browse Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="mb-4">Shop by Category</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find the right components for your hydraulic system
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.name"
            :to="category.href"
            class="card group"
          >
            <div class="aspect-[4/3] bg-neutral-200 relative overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center text-neutral-400">
                <!-- Placeholder for image -->
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-neutral-600 text-sm">
                {{ category.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="mb-4">Why Choose Us</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            We make ordering hydraulic components simple and reliable
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center">
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="feature.icon === 'wrench'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path v-if="feature.icon === 'wrench'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-if="feature.icon === 'shield'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                <path v-if="feature.icon === 'truck'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                <path v-if="feature.icon === 'support'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-neutral-600 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="container-custom text-center">
        <h2 class="mb-4">Ready to Build Your Custom Hose?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Use our configurator to select your hose type, dimensions, and fittings. Get an instant quote and order online.
        </p>
        <NuxtLink to="/products/custom-hose" class="btn bg-white text-primary-600 hover:bg-primary-50">
          Start Building
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
