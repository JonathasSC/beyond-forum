<template>
  <div class="crud">
    <div class="crud__internal__container">
      <div class="crud__formtoggle">
        <router-link to="/newpost">ADD POST +</router-link>
      </div>
      <form class="crud__form" @submit.prevent="addPost" v-if="showForm">
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newPost.owner_username"
          placeholder="owner"
        />
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newPost.title"
          placeholder="title"
        />
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newPost.description"
          placeholder="description"
        />
        <button class="crud__form__button" type="submit">Adicionar</button>
        <button @click="toggleForm" v-if="showForm" class="crud__form__button">
          Cancelar
        </button>
      </form>

      <table class="crud__table">
        <thead>
          <tr>
            <td>OWNER</td>
            <td>TITLE</td>
            <td>DESCRIPTION</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="crud__table__row"
            v-for="(post, index) in paginatedPosts"
            :key="index"
          >
            <td class="crud__table__cell">
              <span class="crud__table__text" v-if="!post.editing">{{
                post.owner_username
              }}</span>
              <input
                v-else
                type="text"
                class="crud__table__input"
                v-model="post.owner_username"
                @blur="finishEdit(post)"
              />
            </td>

            <td class="crud__table__cell">
              <span class="crud__table__text" v-if="!post.editing">
                {{ post.title }}
              </span>
              <input
                v-else
                type="text"
                class="crud__table__input"
                v-model="post.title"
                @blur="finishEdit(post)"
              />
            </td>

            <td class="crud__table__cell">
              <span class="crud__table__text" v-if="!post.editing">
                {{ post.description }}
              </span>
              <input
                class="crud__table__input"
                v-else
                type="text"
                v-model="post.description"
                @blur="finishEdit(post)"
              />
            </td>

            <td class="crud__table__cell action">
              <button class="crud__table__btn" @click="toggleEdit(post)">
                <span class="material-symbols-outlined">
                  {{ post.editing ? "save" : "edit" }}
                </span>
              </button>
            </td>

            <td class="crud__table__cell action">
              <button class="crud__table__btn" @click="removePost(index)">
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <v-pagination
        v-model="currentPage"
        :length="pages"
        @input="onChangePage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCrud",
  components: {},
  data() {
    return {
      posts: [],
      newPost: {
        owner_username: "",
        title: "",
        description: "",
      },
      itemsPerPage: 5,
      currentPage: 1,
      showForm: false,
    };
  },
  created() {
    this.loadPostsFromLocalStorage();
  },
  computed: {
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.posts.slice(startIndex, endIndex);
    },
    pages() {
      return Math.ceil(this.posts.length / this.itemsPerPage);
    },
  },
  methods: {
    addPost() {
      this.posts.push({ ...this.newPost, editing: false });
      this.savePostsToLocalStorage();
      this.clearFields();
      this.toggleForm();
    },
    clearFields() {
      this.newPost = {
        owner_username: "",
        title: "",
        description: "",
      };
    },
    toggleEdit(post) {
      post.editing = !post.editing;
    },
    finishEdit(post) {
      post.editing = false;
      this.savePostsToLocalStorage();
    },
    removePost(index) {
      this.posts.splice(index, 1);
      this.savePostsToLocalStorage();
    },
    onChangePage(page) {
      this.currentPage = page;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    loadPostsFromLocalStorage() {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      this.posts = posts.map((post) => ({ ...post, editing: false }));
    },
    savePostsToLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
  },
};
</script>

<style>
.crud {
  gap: 2rem;
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.crud__table {
  width: 570px;
}

.crud__internal__container {
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.crud__formtoggle {
  width: 100%;
}

.crud__form {
  width: 300px;
  padding: 1rem;
  border-radius: 10px;
  gap: 14px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border: 1px solid red;
}

.crud__form__input,
.crud__form__button {
  padding: 10px;
  width: 100%;
  border: 1px solid red;
}

.crud__table__cell {
  padding: 5px;
}

.crud__table__row {
  border: 2px solid red;
}

.crud__table__row:nth-child(odd) {
  background-color: var(--color-gray);
}

.crud__table__cell,
.crud__table__input {
  width: 170px;
}

.crud__table__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
}

.crud__table__cell {
  -webkit-line-clamp: 3;
  border-bottom: 1px solid red;
  overflow: hidden;
}

.crud__table__cell.action {
  width: 20px;
}

.crud__table__cell.action span {
  transform: translateY(5px);
}

.crud__table {
  border: 1px solid red;
  padding: 10px;
  border-radius: 10px;
}
.crud__table__text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
