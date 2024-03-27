<template>
  <div class="flex flex-col">
    <h1>Log in to your account!</h1>
    <button
      @click="login"
      class="px-6 py-4 bg-blue-400 rounded font-bold text-white mt-4"
    >
      Login with github
    </button>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const { query } = useRoute();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.navigateTo as string, { replace: true });
  }
});

const login = async () => {
  const queryParams =
    query.redirectTo !== undefined ? `?redirectTo=${query.redirectTo}` : "";

  const redirectTo = `${window.location.origin}/confirm${queryParams}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) {
    console.log(error);
  }
};
</script>
