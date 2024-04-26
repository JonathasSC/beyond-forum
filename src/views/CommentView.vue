<template>
  <main class="commentview-main">
    <div class="commentview-container">
      <router-link class="homeview-main__table__data__link" to="/newcomment">
        <v-btn color="primary" elevation="7">Adicionar comentário +</v-btn>
      </router-link>
      <CommentList />
    </div>
  </main>
</template>

<script>
import CommentList from "../components/CommentList";
import AddBtn from "../components/AddBtn";

export default {
  name: "commentview",
  components: {
    CommentList,
    AddBtn,
  },
};
</script>

<style>
.commentview-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
}
.commentview-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  max-width: 720px;
}
</style>
