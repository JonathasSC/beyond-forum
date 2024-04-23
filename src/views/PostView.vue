<template>
  <main class="postview-main">
    <div class="postview-container">
      <AddBtn title="ADICIONAR PUBLICAÇÃO +" route="/newpost" />
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
