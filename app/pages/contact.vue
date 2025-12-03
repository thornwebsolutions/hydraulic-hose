<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us - Hydraulic Hose Co.',
  description: 'Get in touch with our team for questions, quotes, or support.',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: Implement form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert('Thank you for your message! We will get back to you soon.')
  isSubmitting.value = false
}

const contactInfo = [
  {
    icon: 'phone',
    title: 'Phone',
    content: '1-800-555-HOSE',
    subContent: 'Mon-Fri 8am-5pm EST',
  },
  {
    icon: 'email',
    title: 'Email',
    content: 'sales@hydraulichoseco.com',
    subContent: 'We respond within 24 hours',
  },
  {
    icon: 'location',
    title: 'Address',
    content: '123 Industrial Blvd',
    subContent: 'Manufacturing City, ST 12345',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-neutral-900 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
        <p class="text-xl text-neutral-300">
          Have questions? We're here to help.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Contact Info -->
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p class="text-neutral-600 mb-8">
              Our team is ready to answer your questions about products, custom assemblies, or technical specifications.
            </p>

            <div class="space-y-6">
              <div v-for="info in contactInfo" :key="info.title" class="flex gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="info.icon === 'phone'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    <path v-if="info.icon === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <path v-if="info.icon === 'location'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path v-if="info.icon === 'location'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">{{ info.title }}</h3>
                  <p class="text-neutral-900">{{ info.content }}</p>
                  <p class="text-sm text-neutral-500">{{ info.subContent }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <h2 class="text-2xl font-semibold mb-6">Send Us a Message</h2>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium mb-2">Name *</label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="input"
                      placeholder="John Doe"
                    >
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium mb-2">Email *</label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="input"
                      placeholder="john@company.com"
                    >
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label for="phone" class="block text-sm font-medium mb-2">Phone</label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="input"
                      placeholder="(555) 123-4567"
                    >
                  </div>
                  <div>
                    <label for="company" class="block text-sm font-medium mb-2">Company</label>
                    <input
                      id="company"
                      v-model="form.company"
                      type="text"
                      class="input"
                      placeholder="Your company name"
                    >
                  </div>
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium mb-2">Subject *</label>
                  <select id="subject" v-model="form.subject" required class="input">
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-quote">Custom Quote Request</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="order-status">Order Status</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="5"
                    class="input resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="isSubmitting"
                  :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                >
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
