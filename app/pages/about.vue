<script setup lang="ts">
useSeoMeta({
  title: 'About Us - Hydraulic Hose Co.',
  description: 'Learn about our company and our commitment to quality hydraulic hose products.',
})

const stats = [
  { label: 'Years in Business', value: '25+' },
  { label: 'Products Shipped', value: '100K+' },
  { label: 'Satisfied Customers', value: '10K+' },
  { label: 'Team Members', value: '50+' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-neutral-900 text-white py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="mb-6">About Hydraulic Hose Co.</h1>
          <p class="text-xl text-neutral-300 leading-relaxed">
            We're dedicated to providing quality hydraulic hose assemblies and fittings for industrial, agricultural, and commercial applications.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 bg-primary-600 text-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-4xl font-bold mb-2">{{ stat.value }}</p>
            <p class="text-primary-100">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="mb-6">Our Story</h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                Founded with a commitment to quality and customer service, Hydraulic Hose Co. has grown from a small local supplier to a trusted partner for businesses across the country.
              </p>
              <p>
                We understand the critical role hydraulic systems play in your operations. That's why we stock only high-quality hoses and fittings from trusted manufacturers, ensuring you get reliable products that perform when it matters most.
              </p>
              <p>
                Our team brings decades of combined experience in hydraulic systems. Whether you need a standard assembly or a custom configuration for a unique application, we have the expertise to help you find the right solution.
              </p>
            </div>
          </div>
          <div class="aspect-[4/3] bg-neutral-200 rounded-xl flex items-center justify-center">
            <svg class="w-24 h-24 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="mb-4">Our Values</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Quality First</h3>
            <p class="text-neutral-600">
              We never compromise on quality. Every product we sell meets or exceeds industry standards.
            </p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Customer Focus</h3>
            <p class="text-neutral-600">
              Your success is our success. We go above and beyond to ensure you get the right products.
            </p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p class="text-neutral-600">
              We know downtime is costly. That's why we prioritize fast shipping and reliable delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container-custom text-center">
        <h2 class="mb-4">Ready to Get Started?</h2>
        <p class="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          Whether you need a custom hose assembly or have questions about our products, we're here to help.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/products/custom-hose" class="btn-primary">
            Build Custom Hose
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-secondary">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
