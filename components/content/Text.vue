<script setup>
defineProps({
  content: {
    type: {},
  },
});
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-6">
    <span>{{ content.shortSimpleText }}</span>
    <span>{{ content.longSimpleText }}</span>
    <pre>{{ content }}</pre>
  </div>
</template>
