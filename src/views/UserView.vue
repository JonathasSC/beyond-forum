<template>
  <main class="main">
    <UserCrud />
  </main>
</template>

<script>
import UserCrud from "../components/UserCrud";
export default {
  name: "UserView",
  components: {
    UserCrud,
  },
};
</script>
