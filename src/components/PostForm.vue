<template>
  <div class="post__crud">
    <h1>Add Post</h1>
    <form class="post__crud__form" @submit.prevent="addPost">
      <div class="form__input__area">
        <label for="owner_username" class="form__input__label">
          Owner username:
        </label>
        <input
          id="owner_username"
          class="form__input"
          type="text"
          v-model="newPost.owner_username"
          required
        />
      </div>

      <div class="form__input__area">
        <label for="title" class="form__input__label">Title:</label>
        <input
          id="title"
          class="form__input"
          type="text"
          v-model="newPost.title"
          required
        />
      </div>

      <div class="form__input__area">
        <label for="description" class="form__input__label">Description:</label>
        <textarea
          id="description"
          class="form__input"
          type="text"
          v-model="newPost.description"
          required
        ></textarea>
      </div>

      <div class="form__button__area">
        <button class="form__button" type="submit">Adicionar</button>
        <router-link class="form__button" to="/">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostForm",
  components: {},
  data() {
    return {
      newPost: {
        owner_username: "",
        title: "",
        description: "",
      },
    };
  },
  methods: {
    addPost() {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(this.newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      this.clearFields();
    },
    clearFields() {
      this.newPost = {
        owner_username: "",
        title: "",
        description: "",
      };
    },
  },
};
</script>

<style>
.post__crud__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  width: 100vw;
  padding: 40px;
  border: 1px solid red;
}

.form__input__label {
  width: 220px;
}

.form__input__area {
  align-items: center;
  display: flex;
}

.form__input {
  padding: 10px;
  width: 400px;
  border: 1px solid red;
}

.form__button__area {
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1rem;
}

.form__button {
  width: 120px;
  text-align: center;
  padding: 10px;

  border: 1px solid red;
}
</style>
