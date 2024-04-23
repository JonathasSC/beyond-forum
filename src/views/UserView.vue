<template>
  <main class="userview-main">
    <div class="userview-container">
      <AddBtn title="ADICIONAR USUÁRIO +" route="/newuser" />
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
