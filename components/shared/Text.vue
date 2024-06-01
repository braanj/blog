<script setup>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
const props = defineProps({
  content: {
    type: {},
  },
});

const shortSimpleText = computed(() => props.content.shortSimpleText);
const longSimpleText = computed(() => props.content.longSimpleText);

const richText = computed(() => {
  if (!props.content.richText) return;
  return documentToHtmlString(props.content.richText.json);
});
</script>

<template>
  <div class="container py-8 px-4 text-justify">
    <p v-if="shortSimpleText">{{ shortSimpleText }}</p>
    <p v-if="longSimpleText">{{ longSimpleText }}</p>
    <div v-if="richText" v-html="richText"></div>
  </div>
</template>

<style>
*:first-child {
  margin-top: 0;
}
</style>
