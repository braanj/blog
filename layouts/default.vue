<template>
  <speed-insights />
  <main
    class="flex flex-col w-full h-full min-h-screen prose prose-xl max-w-none"
  >
    <slot />
  </main>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
