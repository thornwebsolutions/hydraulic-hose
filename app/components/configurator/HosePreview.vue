<script setup lang="ts">
import type { HoseType, HoseDiameter, FittingType } from '~/types/shopify'

interface Props {
  hoseType?: HoseType | null
  diameter?: HoseDiameter | null
  length?: number
  fittingA?: FittingType | null
  fittingB?: FittingType | null
}

const props = withDefaults(defineProps<Props>(), {
  hoseType: null,
  diameter: null,
  length: 6,
  fittingA: null,
  fittingB: null,
})

// Color mapping for hose types
const hoseColors: Record<string, { primary: string; secondary: string; name: string }> = {
  'r2at': { primary: '#1e40af', secondary: '#3b82f6', name: 'SAE 100R2AT' },
  'r1at': { primary: '#0369a1', secondary: '#38bdf8', name: 'SAE 100R1AT' },
  'r17': { primary: '#166534', secondary: '#4ade80', name: 'SAE 100R17' },
  '4sp': { primary: '#c2410c', secondary: '#fb923c', name: 'SAE 100R12/4SP' },
}

const currentColor = computed(() => {
  if (!props.hoseType) return { primary: '#6b7280', secondary: '#9ca3af', name: 'Select hose type' }
  return hoseColors[props.hoseType.id] || { primary: '#6b7280', secondary: '#9ca3af', name: 'Unknown' }
})

// Calculate hose width based on diameter
const hoseWidth = computed(() => {
  if (!props.diameter) return 20
  const baseWidth = 16
  const multiplier = props.diameter.multiplier || 1
  return baseWidth + (multiplier - 1) * 20
})

const hasAnySelection = computed(() => {
  return props.hoseType || props.diameter || props.fittingA || props.fittingB
})
</script>

<template>
  <div class="hose-preview">
    <!-- SVG Preview -->
    <svg
      viewBox="0 0 300 100"
      class="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <!-- Braided pattern for hose texture -->
        <pattern id="braidPattern" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M0,4 Q2,0 4,4 Q6,8 8,4"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            stroke-width="1"
          />
        </pattern>

        <!-- Gradient for metallic fitting look -->
        <linearGradient id="fittingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#d4d4d8" />
          <stop offset="50%" style="stop-color:#a1a1aa" />
          <stop offset="100%" style="stop-color:#71717a" />
        </linearGradient>

        <!-- Hose gradient -->
        <linearGradient id="hoseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :style="`stop-color:${currentColor.secondary}`" />
          <stop offset="50%" :style="`stop-color:${currentColor.primary}`" />
          <stop offset="100%" :style="`stop-color:${currentColor.secondary}`" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect x="0" y="0" width="300" height="100" fill="#f5f5f5" rx="8" />

      <g v-if="hasAnySelection">
        <!-- Fitting A (Left) -->
        <ConfiguratorFittingSvg
          v-if="fittingA"
          :type="fittingA.id"
          position="left"
          :x="20"
          :y="50"
          :hose-width="hoseWidth"
        />

        <!-- Placeholder for Fitting A -->
        <g v-else>
          <rect
            x="20"
            :y="50 - hoseWidth / 2 - 2"
            width="30"
            :height="hoseWidth + 4"
            fill="#e5e5e5"
            stroke="#d4d4d4"
            stroke-width="1"
            stroke-dasharray="4,2"
            rx="2"
          />
          <text x="35" y="54" text-anchor="middle" fill="#a3a3a3" font-size="8">?</text>
        </g>

        <!-- Hose Body -->
        <g>
          <!-- Main hose rectangle -->
          <rect
            x="50"
            :y="50 - hoseWidth / 2"
            width="200"
            :height="hoseWidth"
            fill="url(#hoseGradient)"
            rx="2"
            class="transition-all duration-300"
          />

          <!-- Texture overlay -->
          <rect
            x="50"
            :y="50 - hoseWidth / 2"
            width="200"
            :height="hoseWidth"
            fill="url(#braidPattern)"
            rx="2"
          />

          <!-- Highlight line -->
          <line
            x1="50"
            :y1="50 - hoseWidth / 2 + 3"
            x2="250"
            :y2="50 - hoseWidth / 2 + 3"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="1"
          />
        </g>

        <!-- Fitting B (Right) -->
        <ConfiguratorFittingSvg
          v-if="fittingB"
          :type="fittingB.id"
          position="right"
          :x="250"
          :y="50"
          :hose-width="hoseWidth"
        />

        <!-- Placeholder for Fitting B -->
        <g v-else>
          <rect
            x="250"
            :y="50 - hoseWidth / 2 - 2"
            width="30"
            :height="hoseWidth + 4"
            fill="#e5e5e5"
            stroke="#d4d4d4"
            stroke-width="1"
            stroke-dasharray="4,2"
            rx="2"
          />
          <text x="265" y="54" text-anchor="middle" fill="#a3a3a3" font-size="8">?</text>
        </g>
      </g>

      <!-- Empty state -->
      <g v-else>
        <text x="150" y="45" text-anchor="middle" fill="#a3a3a3" font-size="12">
          Configure your hose
        </text>
        <text x="150" y="60" text-anchor="middle" fill="#d4d4d4" font-size="10">
          Preview will appear here
        </text>
      </g>
    </svg>

    <!-- Legend -->
    <div v-if="hasAnySelection" class="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
      <div v-if="hoseType" class="flex items-center gap-1">
        <span
          class="w-3 h-3 rounded-sm"
          :style="{ backgroundColor: currentColor.primary }"
        />
        <span>{{ hoseType.name }}</span>
      </div>
      <div v-if="diameter" class="flex items-center gap-1">
        <span class="text-neutral-400">|</span>
        <span>{{ diameter.name }} ID</span>
      </div>
      <div v-if="length" class="flex items-center gap-1">
        <span class="text-neutral-400">|</span>
        <span>{{ length }} ft</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hose-preview {
  @apply bg-neutral-100 rounded-lg p-4;
}
</style>
