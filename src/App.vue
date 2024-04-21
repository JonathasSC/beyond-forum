<template>
  <v-app>
    <v-main>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/newpost">New Post</router-link> |
      <router-link to="/newuser">New Post</router-link> |
      <router-link to="/post">Post</router-link> |
      <router-link to="/user">User</router-link>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
