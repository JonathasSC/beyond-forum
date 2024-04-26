<template>
  <main class="userview-main">
    <div class="userview-container">
      <router-link class="homeview-main__table__data__link" to="/newuser">
        <v-btn color="primary" elevation="7">Adicionar usuário +</v-btn>
      </router-link>
      <UserList />
    </div>
  </main>
</template>

<script>
import UserList from "../components/UserList";
import AddBtn from "../components/AddBtn";

export default {
  name: "UserView",
  components: {
    UserList,
    AddBtn,
  },
};
</script>
<style>
.userview-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
}
.userview-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  max-width: 720px;
}
</style>
