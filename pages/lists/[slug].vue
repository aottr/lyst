<script setup lang="ts">
interface OptionsState {
  region: 'USA' | 'Europe';
}

const route = useRoute();
const slug = route.params.slug;

const lists = (await $fetch('/api/waitinglists')).data;
const list = lists.find((list) => list.slug == slug);
if (!list) clearError({ redirect: '/' });
const email = ref('');
const success = ref(false);
const options = reactive<OptionsState>({
  region: 'USA',
});

const handleSubmit = async () => {
  const formatedEmail = email.value.trim();
  email.value = '';

  if (!formatedEmail) return;
  const entry = await $fetch('/api/entry', {
    method: 'POST',
    body: JSON.stringify({
      email: formatedEmail,
      waitinglist: list?.id,
      region: options.region,
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
  <div v-if="list">
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
      <div class="form-control my-2">
        <label class="label">
          <span class="label-text">Your email address</span>
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="awesome@aottr.dev"
          class="input input-bordered"
          minlength="6"
          required />
      </div>
      <div class="form-control my-2">
        <label class="label">
          <span class="label-text">Your preferred warehouse region</span>
        </label>
        <div class="btn-group btn-group-vertical">
          <button
            class="btn"
            :class="options.region === 'USA' && 'btn-active'"
            @click="options.region = 'USA'">
            Utah (USA)
          </button>
          <button
            class="btn"
            :class="options.region === 'Europe' && 'btn-active'"
            @click="options.region = 'Europe'">
            France
          </button>
        </div>
      </div>
      <button v-on:click="handleSubmit" class="btn btn-success my-2">
        Put me on the list !
      </button>
    </div>
    <NuxtLink to="/" class="btn mt-10">Back</NuxtLink>
  </div>
</template>
