<script setup lang="ts">
import { useLocalCart } from '~/stores/localCart'

const cart = useLocalCart()
const toast = useToast()

// Initialize cart on mount
onMounted(() => {
  cart.initCart()
})

useSeoMeta({
  title: 'Build Custom Hose Assembly - Hydraulic Hose Co.',
  description: 'Configure your custom hydraulic hose assembly. Select hose type, length, diameter, and fittings.',
})

// Configurator state - will be moved to Pinia store
const currentStep = ref(1)
const totalSteps = 4

const steps = [
  { number: 1, name: 'Hose Type', description: 'Select hose material and rating' },
  { number: 2, name: 'Dimensions', description: 'Choose length and diameter' },
  { number: 3, name: 'Fittings', description: 'Configure end fittings' },
  { number: 4, name: 'Review', description: 'Review and add to cart' },
]

// Placeholder configuration options - will come from Shopify metafields
const hoseTypes = [
  { id: 'r2at', name: 'SAE 100R2AT', description: 'Two-wire braided, up to 5000 PSI', pricePerFoot: 12.99 },
  { id: 'r1at', name: 'SAE 100R1AT', description: 'One-wire braided, up to 2750 PSI', pricePerFoot: 8.99 },
  { id: 'r17', name: 'SAE 100R17', description: 'Compact one-wire, up to 3000 PSI', pricePerFoot: 10.99 },
  { id: '4sp', name: 'SAE 100R12/4SP', description: 'Four-wire spiral, up to 6000 PSI', pricePerFoot: 18.99 },
]

const diameters = [
  { id: '0.25', name: '1/4"', multiplier: 1.0 },
  { id: '0.375', name: '3/8"', multiplier: 1.15 },
  { id: '0.5', name: '1/2"', multiplier: 1.3 },
  { id: '0.75', name: '3/4"', multiplier: 1.5 },
  { id: '1', name: '1"', multiplier: 1.8 },
]

const fittingTypes = [
  { id: 'jic-female', name: 'JIC Female Swivel', price: 8.50 },
  { id: 'jic-male', name: 'JIC Male', price: 7.50 },
  { id: 'npt-male', name: 'NPT Male', price: 6.75 },
  { id: 'npt-female', name: 'NPT Female', price: 7.25 },
  { id: 'orfs-male', name: 'ORFS Male', price: 9.50 },
  { id: 'orfs-female', name: 'ORFS Female Swivel', price: 10.50 },
]

// Configuration state
const config = reactive({
  hoseType: null as typeof hoseTypes[0] | null,
  diameter: null as typeof diameters[0] | null,
  length: 6,
  fittingA: null as typeof fittingTypes[0] | null,
  fittingB: null as typeof fittingTypes[0] | null,
})

// Calculated price
const calculatedPrice = computed(() => {
  if (!config.hoseType || !config.diameter) return 0

  const hosePrice = config.hoseType.pricePerFoot * config.diameter.multiplier * config.length
  const fittingAPrice = config.fittingA?.price || 0
  const fittingBPrice = config.fittingB?.price || 0

  return hosePrice + fittingAPrice + fittingBPrice
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return config.hoseType !== null
    case 2: return config.diameter !== null && config.length > 0
    case 3: return config.fittingA !== null && config.fittingB !== null
    case 4: return true
    default: return false
  }
})

const nextStep = () => {
  if (currentStep.value < totalSteps && canProceed.value) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const addToCart = () => {
  if (!config.hoseType || !config.diameter || !config.fittingA || !config.fittingB) {
    toast.error('Please complete all configuration steps')
    return
  }

  // Build descriptive name with configuration
  const assemblyName = `Custom ${config.hoseType.name} Assembly - ${config.diameter.name} x ${config.length}ft`

  // Add to cart
  cart.addItem(
    {
      id: `custom-assembly-${Date.now()}`,
      name: assemblyName,
      price: calculatedPrice.value,
      priceUnit: 'each',
    },
    1
  )

  // Show success toast
  toast.success('Custom hose assembly added to cart!')

  // Reset wizard to step 1 for another configuration
  currentStep.value = 1
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Page Header -->
    <section class="bg-neutral-900 text-white py-12">
      <div class="container-custom">
        <h1 class="text-3xl font-bold mb-2">Build Your Custom Hose Assembly</h1>
        <p class="text-neutral-300">
          Configure your hose in 4 easy steps
        </p>
      </div>
    </section>

    <!-- Configurator -->
    <section class="py-12">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Main Configuration Panel -->
          <div class="flex-1">
            <!-- Step Indicator -->
            <div class="mb-8">
              <div class="flex items-center justify-between">
                <template v-for="(step, index) in steps" :key="step.number">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors"
                      :class="[
                        currentStep >= step.number
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      ]"
                    >
                      {{ step.number }}
                    </div>
                    <div class="ml-3 hidden sm:block">
                      <p class="font-medium text-sm" :class="currentStep >= step.number ? 'text-neutral-900' : 'text-neutral-500'">
                        {{ step.name }}
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="index < steps.length - 1"
                    class="flex-1 h-0.5 mx-4"
                    :class="currentStep > step.number ? 'bg-primary-600' : 'bg-neutral-200'"
                  />
                </template>
              </div>
            </div>

            <!-- Step Content -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 lg:p-8">
              <!-- Step 1: Hose Type -->
              <div v-if="currentStep === 1">
                <h2 class="text-xl font-semibold mb-2">Select Hose Type</h2>
                <p class="text-neutral-600 mb-6">Choose the hose type based on your pressure and application requirements.</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    v-for="hose in hoseTypes"
                    :key="hose.id"
                    type="button"
                    class="p-4 rounded-lg border-2 text-left transition-all"
                    :class="[
                      config.hoseType?.id === hose.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    ]"
                    @click="config.hoseType = hose"
                  >
                    <p class="font-semibold">{{ hose.name }}</p>
                    <p class="text-sm text-neutral-600 mt-1">{{ hose.description }}</p>
                    <p class="text-sm font-medium text-primary-600 mt-2">${{ hose.pricePerFoot.toFixed(2) }}/ft</p>
                  </button>
                </div>
              </div>

              <!-- Step 2: Dimensions -->
              <div v-if="currentStep === 2">
                <h2 class="text-xl font-semibold mb-2">Select Dimensions</h2>
                <p class="text-neutral-600 mb-6">Choose the inner diameter and overall length of your hose.</p>

                <div class="space-y-6">
                  <div>
                    <label class="block font-medium mb-3">Inner Diameter</label>
                    <div class="flex flex-wrap gap-3">
                      <button
                        v-for="dia in diameters"
                        :key="dia.id"
                        type="button"
                        class="px-6 py-3 rounded-lg border-2 font-medium transition-all"
                        :class="[
                          config.diameter?.id === dia.id
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-neutral-300'
                        ]"
                        @click="config.diameter = dia"
                      >
                        {{ dia.name }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block font-medium mb-3">Length (feet)</label>
                    <div class="flex items-center gap-4">
                      <input
                        v-model.number="config.length"
                        type="number"
                        min="1"
                        max="100"
                        step="0.5"
                        class="input w-32"
                      >
                      <span class="text-neutral-600">feet</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Fittings -->
              <div v-if="currentStep === 3">
                <h2 class="text-xl font-semibold mb-2">Select Fittings</h2>
                <p class="text-neutral-600 mb-6">Choose the fitting type for each end of your hose.</p>

                <div class="space-y-8">
                  <div>
                    <label class="block font-medium mb-3">Fitting A (End 1)</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <button
                        v-for="fitting in fittingTypes"
                        :key="fitting.id"
                        type="button"
                        class="p-3 rounded-lg border-2 text-left transition-all"
                        :class="[
                          config.fittingA?.id === fitting.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        ]"
                        @click="config.fittingA = fitting"
                      >
                        <p class="font-medium text-sm">{{ fitting.name }}</p>
                        <p class="text-sm text-primary-600">${{ fitting.price.toFixed(2) }}</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block font-medium mb-3">Fitting B (End 2)</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <button
                        v-for="fitting in fittingTypes"
                        :key="fitting.id"
                        type="button"
                        class="p-3 rounded-lg border-2 text-left transition-all"
                        :class="[
                          config.fittingB?.id === fitting.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        ]"
                        @click="config.fittingB = fitting"
                      >
                        <p class="font-medium text-sm">{{ fitting.name }}</p>
                        <p class="text-sm text-primary-600">${{ fitting.price.toFixed(2) }}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4: Review -->
              <div v-if="currentStep === 4">
                <h2 class="text-xl font-semibold mb-2">Review Your Configuration</h2>
                <p class="text-neutral-600 mb-6">Please review your custom hose assembly before adding to cart.</p>

                <div class="space-y-4">
                  <div class="flex justify-between py-3 border-b border-neutral-200">
                    <span class="text-neutral-600">Hose Type</span>
                    <span class="font-medium">{{ config.hoseType?.name }}</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-neutral-200">
                    <span class="text-neutral-600">Inner Diameter</span>
                    <span class="font-medium">{{ config.diameter?.name }}</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-neutral-200">
                    <span class="text-neutral-600">Length</span>
                    <span class="font-medium">{{ config.length }} ft</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-neutral-200">
                    <span class="text-neutral-600">Fitting A</span>
                    <span class="font-medium">{{ config.fittingA?.name }}</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-neutral-200">
                    <span class="text-neutral-600">Fitting B</span>
                    <span class="font-medium">{{ config.fittingB?.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  class="btn-secondary"
                  @click="prevStep"
                >
                  Back
                </button>
                <div v-else />

                <button
                  v-if="currentStep < totalSteps"
                  type="button"
                  class="btn-primary"
                  :disabled="!canProceed"
                  :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
                  @click="nextStep"
                >
                  Continue
                </button>
                <button
                  v-else
                  type="button"
                  class="btn-accent"
                  @click="addToCart"
                >
                  Add to Cart - ${{ calculatedPrice.toFixed(2) }}
                </button>
              </div>
            </div>
          </div>

          <!-- Preview Sidebar -->
          <aside class="lg:w-80 flex-shrink-0">
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-24">
              <h3 class="font-semibold mb-4">Your Configuration</h3>

              <!-- Visual Preview -->
              <ConfiguratorHosePreview
                :hose-type="config.hoseType"
                :diameter="config.diameter"
                :length="config.length"
                :fitting-a="config.fittingA"
                :fitting-b="config.fittingB"
                class="mb-6"
              />

              <!-- Configuration Summary -->
              <div class="space-y-3 text-sm">
                <div v-if="config.hoseType" class="flex justify-between">
                  <span class="text-neutral-600">Hose:</span>
                  <span class="font-medium">{{ config.hoseType.name }}</span>
                </div>
                <div v-if="config.diameter" class="flex justify-between">
                  <span class="text-neutral-600">Diameter:</span>
                  <span class="font-medium">{{ config.diameter.name }}</span>
                </div>
                <div v-if="config.length" class="flex justify-between">
                  <span class="text-neutral-600">Length:</span>
                  <span class="font-medium">{{ config.length }} ft</span>
                </div>
                <div v-if="config.fittingA" class="flex justify-between">
                  <span class="text-neutral-600">Fitting A:</span>
                  <span class="font-medium">{{ config.fittingA.name }}</span>
                </div>
                <div v-if="config.fittingB" class="flex justify-between">
                  <span class="text-neutral-600">Fitting B:</span>
                  <span class="font-medium">{{ config.fittingB.name }}</span>
                </div>
              </div>

              <!-- Price -->
              <div class="mt-6 pt-4 border-t border-neutral-200">
                <div class="flex justify-between items-center">
                  <span class="font-semibold">Total Price:</span>
                  <span class="text-2xl font-bold text-primary-600">
                    ${{ calculatedPrice.toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
