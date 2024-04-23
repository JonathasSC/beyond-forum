<template>
  <div class="addbtn">
    <router-link class="addbtn__link" :to="route">
      <span>{{ title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AddBtn",
  props: {
    title: String,
    route: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.addbtn {
  max-width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-blue-100);
}
.addbtn__link {
  text-transform: uppercase;
}
.addbtn__link span {
  color: var(--color-white);
}
</style>
