<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />

    <main class="flex-1">
      <slot />
    </main>

    <LayoutFooter />

    <!-- Toast notifications -->
    <UiToast />
  </div>
</template>
