<template>
  <main class="postview-main">
    <div class="postview-container">
      <router-link class="homeview-main__table__data__link" to="/newpost">
        <v-btn color="primary" elevation="7">Adicionar publicação +</v-btn>
      </router-link>
      <PostList />
    </div>
  </main>
</template>

<script>
import PostList from "../components/PostList";
import AddBtn from "../components/AddBtn";

export default {
  name: "PostView",
  components: {
    PostList,
    AddBtn,
  },
};
</script>

<style>
.postview-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
}
.postview-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  max-width: 720px;
}
</style>
