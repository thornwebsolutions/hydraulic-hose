<script setup lang="ts">
interface Props {
  type: string
  position: 'left' | 'right'
  x: number
  y: number
  hoseWidth: number
}

const props = defineProps<Props>()

// Fitting dimensions
const fittingLength = 30
const collarWidth = 8

// Calculate if we need to flip for right side
const isRight = computed(() => props.position === 'right')
const transform = computed(() => {
  if (isRight.value) {
    return `translate(${props.x + fittingLength}, ${props.y}) scale(-1, 1)`
  }
  return `translate(${props.x}, ${props.y})`
})

// Fitting type configurations
const fittingConfigs: Record<string, { name: string; shape: string }> = {
  'jic-female': { name: 'JIC Female', shape: 'jic' },
  'jic-male': { name: 'JIC Male', shape: 'jic' },
  'npt-male': { name: 'NPT Male', shape: 'npt' },
  'npt-female': { name: 'NPT Female', shape: 'npt' },
  'orfs-male': { name: 'ORFS Male', shape: 'orfs' },
  'orfs-female': { name: 'ORFS Female', shape: 'orfs' },
}

const fittingShape = computed(() => {
  return fittingConfigs[props.type]?.shape || 'generic'
})
</script>

<template>
  <g :transform="transform">
    <!-- JIC Fitting (37-degree flare) -->
    <g v-if="fittingShape === 'jic'">
      <!-- Collar/crimp section -->
      <rect
        :x="0"
        :y="-hoseWidth / 2 - 2"
        :width="collarWidth"
        :height="hoseWidth + 4"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Body -->
      <rect
        :x="collarWidth"
        :y="-hoseWidth / 2 + 2"
        :width="12"
        :height="hoseWidth - 4"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Flare section (37-degree cone) -->
      <path
        :d="`M ${collarWidth + 12} ${-hoseWidth / 2 + 2}
             L ${collarWidth + 22} ${-hoseWidth / 2 - 4}
             L ${collarWidth + 22} ${hoseWidth / 2 + 4}
             L ${collarWidth + 12} ${hoseWidth / 2 - 2}
             Z`"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Hex nut indication -->
      <rect
        :x="collarWidth + 3"
        :y="-hoseWidth / 2"
        width="6"
        :height="hoseWidth"
        fill="none"
        stroke="#71717a"
        stroke-width="0.5"
        stroke-dasharray="2,1"
      />
    </g>

    <!-- NPT Fitting (tapered pipe thread) -->
    <g v-else-if="fittingShape === 'npt'">
      <!-- Collar/crimp section -->
      <rect
        :x="0"
        :y="-hoseWidth / 2 - 2"
        :width="collarWidth"
        :height="hoseWidth + 4"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Hex body -->
      <polygon
        :points="`
          ${collarWidth},${-hoseWidth / 2 - 1}
          ${collarWidth + 14},${-hoseWidth / 2 - 1}
          ${collarWidth + 16},${-hoseWidth / 2 + 4}
          ${collarWidth + 16},${hoseWidth / 2 - 4}
          ${collarWidth + 14},${hoseWidth / 2 + 1}
          ${collarWidth},${hoseWidth / 2 + 1}
        `"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Threaded section (tapered) -->
      <path
        :d="`M ${collarWidth + 16} ${-hoseWidth / 2 + 4}
             L ${collarWidth + 24} ${-hoseWidth / 2 + 6}
             L ${collarWidth + 24} ${hoseWidth / 2 - 6}
             L ${collarWidth + 16} ${hoseWidth / 2 - 4}
             Z`"
        fill="#a1a1aa"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Thread lines -->
      <g stroke="#71717a" stroke-width="0.3">
        <line :x1="collarWidth + 17" :y1="-hoseWidth / 2 + 5" :x2="collarWidth + 17" :y2="hoseWidth / 2 - 5" />
        <line :x1="collarWidth + 19" :y1="-hoseWidth / 2 + 5.5" :x2="collarWidth + 19" :y2="hoseWidth / 2 - 5.5" />
        <line :x1="collarWidth + 21" :y1="-hoseWidth / 2 + 6" :x2="collarWidth + 21" :y2="hoseWidth / 2 - 6" />
        <line :x1="collarWidth + 23" :y1="-hoseWidth / 2 + 6" :x2="collarWidth + 23" :y2="hoseWidth / 2 - 6" />
      </g>
    </g>

    <!-- ORFS Fitting (O-Ring Face Seal) -->
    <g v-else-if="fittingShape === 'orfs'">
      <!-- Collar/crimp section -->
      <rect
        :x="0"
        :y="-hoseWidth / 2 - 2"
        :width="collarWidth"
        :height="hoseWidth + 4"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Body -->
      <rect
        :x="collarWidth"
        :y="-hoseWidth / 2"
        :width="14"
        :height="hoseWidth"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- Flat face with O-ring groove -->
      <rect
        :x="collarWidth + 14"
        :y="-hoseWidth / 2 - 3"
        :width="8"
        :height="hoseWidth + 6"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
      />

      <!-- O-ring groove (visual indicator) -->
      <ellipse
        :cx="collarWidth + 22"
        :cy="0"
        :rx="1"
        :ry="hoseWidth / 2 - 2"
        fill="none"
        stroke="#52525b"
        stroke-width="1"
      />

      <!-- O-ring -->
      <ellipse
        :cx="collarWidth + 22"
        :cy="0"
        :rx="0.5"
        :ry="hoseWidth / 2 - 3"
        fill="#1f2937"
        stroke="none"
      />
    </g>

    <!-- Generic/fallback fitting -->
    <g v-else>
      <rect
        :x="0"
        :y="-hoseWidth / 2 - 2"
        :width="fittingLength"
        :height="hoseWidth + 4"
        fill="url(#fittingGradient)"
        stroke="#52525b"
        stroke-width="0.5"
        rx="2"
      />
    </g>
  </g>
</template>
