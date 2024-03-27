<template>
  <div v-if="user" class="flex gap-3 items-center py-3 px-4 bg-white rounded">
    <img
      :src="user.avatar"
      class="w-10 h-10 rounded-full"
      alt="github user profile image"
    />
    <div class="flex flex-col">
      <span class="font-bold">{{ user.name }}</span>
      <button class="text-start" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script setup>
const USER = useSupabaseUser();
const { auth } = useSupabaseClient();

const logout = async () => {
  const { error } = await auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  await navigateTo("/login");
};

const user = computed(() => {
  if (!USER.value) return;

  return {
    name: USER.value.user_metadata.name,
    avatar: USER.value.user_metadata.avatar_url,
  };
});
</script>
