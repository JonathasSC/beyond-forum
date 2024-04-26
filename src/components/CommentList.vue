<template>
  <div class="post-list">
    <table class="post-list__table">
      <thead class="post-list__table__head">
        <tr class="post-list__table__head__row">
          <th class="post-list__table__head__th">OWNER USERNAME</th>
          <th class="post-list__table__head__th">POST ID</th>
          <th class="post-list__table__head__th">TEXT</th>
          <th colspan="4" class="post-list__table__head__th"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="post-list__table__row"
          v-for="(comment, index) in paginatedComments"
          :key="index"
        >
          <td class="post-list__table__cell">
            <span v-if="!comment.editing">{{ comment.owner_username }}</span>
            <input
              v-else
              type="text"
              class="post-list__table__input"
              v-model="comment.owner_username"
              @blur="finishEdit(comment)"
            />
          </td>

          <td class="post-list__table__cell">
            <span v-if="!comment.editing">
              {{ comment.post_id }}
            </span>
            <input
              v-else
              type="text"
              class="post-list__table__input"
              v-model="comment.post_id"
              @blur="finishEdit(comment)"
            />
          </td>

          <td class="post-list__table__cell">
            <span v-if="!comment.editing">
              {{ comment.text }}
            </span>
            <input
              class="post-list__table__input"
              v-else
              type="text"
              v-model="comment.text"
              @blur="finishEdit(comment)"
            />
          </td>

          <td class="post-list__table__cell action">
            <button class="post-list__table__btn" @click="toggleEdit(comment)">
              <span class="material-symbols-outlined">
                {{ comment.editing ? "save" : "edit" }}
              </span>
            </button>
          </td>

          <td class="post-list__table__cell action">
            <v-dialog v-model="showDeleteConfirmation" width="500">
              <template v-slot:activator="{ on, attrs }">
                <button
                  class="user-list__table__btn"
                  @click="removeComment(index)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Confirm Deletion
                </v-card-title>

                <v-card-text>
                  Are you sure you want to delete this comment?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="confirmDelete">
                    Yes, delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  name: "CommentList",
  components: {},
  data() {
    return {
      dialog: false,
      comments: [],
      newComment: {
        post_id: "",
        owner_username: "",
        text: "",
      },
      itemsPerPage: 5,
      currentPage: 1,
      showForm: false,
      confirmDeleteIndex: -1,
      showDeleteConfirmation: false,
    };
  },

  created() {
    this.loadCommentsFromLocalStorage();
  },

  computed: {
    paginatedComments() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.comments.slice(startIndex, endIndex);
    },
    pages() {
      return Math.ceil(this.comments.length / this.itemsPerPage);
    },
  },
  methods: {
    addComment() {
      this.posts.push({ ...this.newComment, editing: false });
      this.saveCommentsToLocalStorage();
      this.clearFields();
      this.toggleForm();
    },
    clearFields() {
      this.newComment = {
        post_id: "",
        owner_username: "",
        text: "",
      };
    },
    toggleEdit(comment) {
      comment.editing = !comment.editing;
    },
    finishEdit(comment) {
      comment.editing = false;
      this.saveCommentsToLocalStorage();
    },
    removeComment(index) {
      this.confirmDeleteIndex = index;
      this.showDeleteConfirmation = true;
    },
    confirmDelete() {
      if (this.confirmDeleteIndex !== -1) {
        this.comments.splice(this.confirmDeleteIndex, 1);
        this.saveCommentsToLocalStorage();
        this.showDeleteConfirmation = false;
        this.confirmDeleteIndex = -1;
      }
    },
    onChangePage(page) {
      this.currentPage = page;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    loadCommentsFromLocalStorage() {
      const comments = JSON.parse(localStorage.getItem("comments")) || [];
      this.comments = comments.map((comment) => ({
        ...comment,
        editing: false,
      }));
    },
    saveCommentsToLocalStorage() {
      localStorage.setItem("comments", JSON.stringify(this.comments));
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
