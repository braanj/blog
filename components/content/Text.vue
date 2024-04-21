<script setup>
const props = defineProps({
  content: {
    type: {},
  },
});

const shortSimpleText = computed(() => props.content.shortSimpleText);
const longSimpleText = computed(() => props.content.longSimpleText);

const { data: richText } = useAsyncData("richText", async (_) => {
  const { documentToHtmlString } = await import(
    "@contentful/rich-text-html-renderer"
  );

  return documentToHtmlString(props.content.richText.json);
});
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-4">
    <p v-if="shortSimpleText">{{ shortSimpleText }}</p>
    <p v-if="longSimpleText">{{ longSimpleText }}</p>
    <div v-if="richText" v-html="richText"></div>
  </div>
</template>
