<template>
  <div class="post-list">
    <table class="post-list__table">
      <thead class="post-list__table__head">
        <tr class="post-list__table__head__row">
          <th class="post-list__table__head__th">OWNER USERNAME</th>
          <th class="post-list__table__head__th">TITLE</th>
          <th class="post-list__table__head__th">DESCRIPTION</th>
          <th colspan="4" class="post-list__table__head__th"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="post-list__table__row"
          v-for="(post, index) in paginatedPosts"
          :key="index"
        >
          <td class="post-list__table__cell">
            <span v-if="!post.editing">{{ post.owner_username }}</span>
            <input
              v-else
              type="text"
              class="post-list__table__input"
              v-model="post.owner_username"
              @blur="finishEdit(post)"
            />
          </td>

          <td class="post-list__table__cell">
            <span v-if="!post.editing">
              {{ post.title }}
            </span>
            <input
              v-else
              type="text"
              class="post-list__table__input"
              v-model="post.title"
              @blur="finishEdit(post)"
            />
          </td>

          <td class="post-list__table__cell">
            <span v-if="!post.editing">
              {{ post.description }}
            </span>
            <input
              class="post-list__table__input"
              v-else
              type="text"
              v-model="post.description"
              @blur="finishEdit(post)"
            />
          </td>

          <td class="post-list__table__cell action">
            <button class="post-list__table__btn" @click="toggleEdit(post)">
              <span class="material-symbols-outlined">
                {{ post.editing ? "save" : "edit" }}
              </span>
            </button>
          </td>

          <td class="post-list__table__cell action">
            <button class="post-list__table__btn" @click="removePost(index)">
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
</template>

<script>
export default {
  name: "Postlist",
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
.post-list__table__head {
  background-color: var(--color-blue-100);
  width: 100%;
  text-align: left;
}

.post-list__table__head__th {
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-white);
}

.post-list__form__input {
  color: var(--color-white);
}

.post-list__table {
  width: 100%;
}

.post-list__table__cell {
  padding: 5px;
}

.post-list__table__row:nth-child(odd) {
  background-color: var(--color-gray-100);
}

.post-list__table__cell,
.post-list__table__input {
  width: 170px;

  color: var(--color-white);
}

.post-list__table__cell.action {
  width: 20px;
}

.post-list__table__cell.action span {
  transform: translateY(5px);
}
</style>
