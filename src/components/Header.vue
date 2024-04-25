<template>
  <v-app-bar :elevation="0">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <router-link class="header__link" to="/">
        <span class="header__link__span">Administração</span>
      </router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.v-toolbar__content {
  background: var(--color-gray-100);
}

.v-app-bar-title__content {
  display: -webkit-box;
}

.header__link {
  text-decoration: none;
}

.header__link__span {
  color: var(--color-blue-100);
  font-weight: bold;
}
</style>
