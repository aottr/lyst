<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;

const lists = (await $fetch('/api/wishlists')).data;
const list = lists.find((list) => list.slug == slug);
if (!list) clearError({ redirect: '/' });
const email = ref('');
const success = ref(false);

const handleSubmit = async () => {
  const formatedEmail = email.value.trim();
  email.value = '';

  if (!formatedEmail) return;
  const entry = await $fetch('/api/entry', {
    method: 'POST',
    body: JSON.stringify({
      email: formatedEmail,
      waitinglist: list?.id,
    }),
  });
  success.value = true;
};
</script>

<template>
  <Html>
    <Head>
      <Title v-if="list">{{ list.name }}</Title>
    </Head>
  </Html>
  <div v-if="list" class="container mx-auto">
    <div v-if="success" class="alert alert-success shadow-lg my-3">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Your mail address has been added to the waitinglist !</span>
      </div>
    </div>

    <div class="form-control max-w-md mx-auto">
      <h1 class="text-3xl my-4">{{ list.name }}</h1>
      <input
        v-model="email"
        type="email"
        placeholder="awesome@aottr.dev"
        class="input input-bordered my-2"
        minlength="6"
        required />
      <button v-on:click="handleSubmit" class="btn btn-success my-2">
        Put me on the list !
      </button>
    </div>
    <NuxtLink to="/" class="btn mt-10">Back</NuxtLink>
  </div>
</template>
