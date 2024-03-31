<script setup>
defineProps({
  content: {
    type: {},
  },
});
</script>

<template>
  <span>{{ content.shortSimpleText }}</span>
  <pre>{{ content }}</pre>
</template>
