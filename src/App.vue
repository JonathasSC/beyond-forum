<template>
  <v-app>
    <v-main>
      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({}),
};
</script>

<style>
.v-main__wrap {
  background-color: var(--color-gray-200);
}
</style>
