// Configurator Store
// Manages the state of the custom hose configurator

import { defineStore } from 'pinia'
import type { HoseConfiguration, HoseType, HoseDiameter, FittingType } from '~/types/shopify'

export const useConfiguratorStore = defineStore('configurator', () => {
  // Configuration state
  const config = ref<HoseConfiguration>({
    hoseType: null,
    diameter: null,
    length: 6,
    fittingA: null,
    fittingB: null,
  })

  const currentStep = ref(1)
  const totalSteps = 4

  // Mock data - will be replaced with Shopify metafield data
  const hoseTypes = ref<HoseType[]>([
    { id: 'r2at', name: 'SAE 100R2AT', description: 'Two-wire braided, up to 5000 PSI', pricePerFoot: 12.99, maxPressure: 5000, temperatureRange: '-40°F to 250°F' },
    { id: 'r1at', name: 'SAE 100R1AT', description: 'One-wire braided, up to 2750 PSI', pricePerFoot: 8.99, maxPressure: 2750, temperatureRange: '-40°F to 250°F' },
    { id: 'r17', name: 'SAE 100R17', description: 'Compact one-wire, up to 3000 PSI', pricePerFoot: 10.99, maxPressure: 3000, temperatureRange: '-40°F to 212°F' },
    { id: '4sp', name: 'SAE 100R12/4SP', description: 'Four-wire spiral, up to 6000 PSI', pricePerFoot: 18.99, maxPressure: 6000, temperatureRange: '-40°F to 250°F' },
  ])

  const diameters = ref<HoseDiameter[]>([
    { id: '0.25', name: '1/4"', innerDiameter: 0.25, multiplier: 1.0 },
    { id: '0.375', name: '3/8"', innerDiameter: 0.375, multiplier: 1.15 },
    { id: '0.5', name: '1/2"', innerDiameter: 0.5, multiplier: 1.3 },
    { id: '0.75', name: '3/4"', innerDiameter: 0.75, multiplier: 1.5 },
    { id: '1', name: '1"', innerDiameter: 1, multiplier: 1.8 },
  ])

  const fittingTypes = ref<FittingType[]>([
    { id: 'jic-female', name: 'JIC Female Swivel', description: '37-degree flare', price: 8.50, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
    { id: 'jic-male', name: 'JIC Male', description: '37-degree flare', price: 7.50, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
    { id: 'npt-male', name: 'NPT Male', description: 'Pipe thread', price: 6.75, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
    { id: 'npt-female', name: 'NPT Female', description: 'Pipe thread', price: 7.25, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
    { id: 'orfs-male', name: 'ORFS Male', description: 'O-ring face seal', price: 9.50, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
    { id: 'orfs-female', name: 'ORFS Female Swivel', description: 'O-ring face seal', price: 10.50, compatibleDiameters: ['0.25', '0.375', '0.5', '0.75', '1'] },
  ])

  // Computed values
  const calculatedPrice = computed(() => {
    if (!config.value.hoseType || !config.value.diameter) return 0

    const hosePrice = config.value.hoseType.pricePerFoot * config.value.diameter.multiplier * config.value.length
    const fittingAPrice = config.value.fittingA?.price || 0
    const fittingBPrice = config.value.fittingB?.price || 0

    return Math.round((hosePrice + fittingAPrice + fittingBPrice) * 100) / 100
  })

  const compatibleFittings = computed(() => {
    if (!config.value.diameter) return fittingTypes.value
    return fittingTypes.value.filter(f =>
      f.compatibleDiameters.includes(config.value.diameter!.id)
    )
  })

  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1: return config.value.hoseType !== null
      case 2: return config.value.diameter !== null && config.value.length > 0
      case 3: return config.value.fittingA !== null && config.value.fittingB !== null
      case 4: return true
      default: return false
    }
  })

  const isComplete = computed(() => {
    return config.value.hoseType !== null &&
           config.value.diameter !== null &&
           config.value.length > 0 &&
           config.value.fittingA !== null &&
           config.value.fittingB !== null
  })

  // Actions
  function setHoseType(hose: HoseType) {
    config.value.hoseType = hose
  }

  function setDiameter(diameter: HoseDiameter) {
    config.value.diameter = diameter
    // Reset fittings if they're no longer compatible
    if (config.value.fittingA && !compatibleFittings.value.find(f => f.id === config.value.fittingA?.id)) {
      config.value.fittingA = null
    }
    if (config.value.fittingB && !compatibleFittings.value.find(f => f.id === config.value.fittingB?.id)) {
      config.value.fittingB = null
    }
  }

  function setLength(length: number) {
    config.value.length = Math.max(1, Math.min(100, length))
  }

  function setFittingA(fitting: FittingType) {
    config.value.fittingA = fitting
  }

  function setFittingB(fitting: FittingType) {
    config.value.fittingB = fitting
  }

  function nextStep() {
    if (currentStep.value < totalSteps && canProceed.value) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= totalSteps) {
      currentStep.value = step
    }
  }

  function reset() {
    config.value = {
      hoseType: null,
      diameter: null,
      length: 6,
      fittingA: null,
      fittingB: null,
    }
    currentStep.value = 1
  }

  function getCartAttributes() {
    if (!isComplete.value) return []

    return [
      { key: 'Hose Type', value: config.value.hoseType!.name },
      { key: 'Inner Diameter', value: config.value.diameter!.name },
      { key: 'Length', value: `${config.value.length} ft` },
      { key: 'Fitting A', value: config.value.fittingA!.name },
      { key: 'Fitting B', value: config.value.fittingB!.name },
      { key: 'Calculated Price', value: calculatedPrice.value.toFixed(2) },
    ]
  }

  return {
    // State
    config,
    currentStep,
    totalSteps,
    hoseTypes,
    diameters,
    fittingTypes,

    // Computed
    calculatedPrice,
    compatibleFittings,
    canProceed,
    isComplete,

    // Actions
    setHoseType,
    setDiameter,
    setLength,
    setFittingA,
    setFittingB,
    nextStep,
    prevStep,
    goToStep,
    reset,
    getCartAttributes,
  }
})
