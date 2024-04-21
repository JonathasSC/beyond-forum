<template>
  <main class="main">
    <UserCrud />
    <PostCrud />
  </main>
</template>

<script>
import UserCrud from "../components/UserCrud";
import PostCrud from "../components/PostCrud";

export default {
  name: "Home",

  components: {
    UserCrud,
    PostCrud,
  },
};
</script>

<style>
.main {
  width: 100vh;
  height: 100%;
}
</style>
