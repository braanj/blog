<template>
  <SliceZone
    wrapper="main"
    :slices="home?.data.slices ?? []"
    :components="components"
  />
</template>

<script setup>
import { components } from "~/slices";

const { client } = usePrismic();
const prismic = usePrismic();
const settings = useSettings();

const { data: home } = await useAsyncData("home", () =>
  client.getByUID("page", "home")
);

useHead({
  title: () =>
    `${prismic.asText(home.value?.data.title)} | ${prismic.asText(settings.value?.data.siteTitle)}`,
});

useSeoMeta({
  title: () => home.value?.data.metaTitle,
  ogTitle: () => home.value?.data.metaTitle,
  description: () => home.value?.data.metaDescription,
  ogDescription: () => home.value?.data.metaDescription,
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
