<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Fórum Administration</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon> <v-icon>mdi-account</v-icon></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.v-app-bar-title__content {
  display: -webkit-box;
}
</style>
