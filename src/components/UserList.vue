<template>
  <div class="user-list">
    <table class="user-list__table">
      <thead class="user-list__table__head">
        <tr class="user-list__table__head__row">
          <th class="user-list__table__head__th">Username</th>
          <th class="user-list__table__head__th">Email</th>
          <th class="user-list__table__head__th">Password</th>
          <th colspan="4" class="user-list__table__head__th"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="user-list__table__row"
          v-for="(user, index) in paginatedUsers"
          :key="index"
        >
          <td class="user-list__table__cell">
            <span v-if="!user.editing">{{ user.username }}</span>
            <input
              v-else
              type="text"
              class="user-list__table__input"
              v-model="user.username"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="user-list__table__cell">
            <span v-if="!user.editing">{{ user.email }}</span>
            <input
              v-else
              type="text"
              class="user-list__table__input"
              v-model="user.email"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="user-list__table__cell">
            <span v-if="!user.editing">{{ user.password }}</span>
            <input
              class="user-list__table__input"
              v-else
              type="password"
              v-model="user.password"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="user-list__table__cell action">
            <button class="user-list__table__btn" @click="toggleEdit(user)">
              <span class="material-symbols-outlined">
                {{ user.editing ? "save" : "edit" }}
              </span>
            </button>
          </td>

          <td class="user-list__table__cell action">
            <v-dialog v-model="showDeleteConfirmation" width="500">
              <template v-slot:activator="{ on, attrs }">
                <button
                  class="user-list__table__btn"
                  @click="removeUser(index)"
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
                  Are you sure you want to delete this user?
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
  name: "UserList",
  components: {},
  data() {
    return {
      dialog: false,
      users: [],
      newUser: {
        username: "",
        email: "",
        password: "",
      },
      itemsPerPage: 5,
      currentPage: 1,
      showForm: false,
      confirmDeleteIndex: -1,
      showDeleteConfirmation: false,
    };
  },
  created() {
    this.loadUsersFromLocalStorage();
  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.users.slice(startIndex, endIndex);
    },
    pages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
  },
  methods: {
    addUser() {
      this.users.push({ ...this.newUser, editing: false });
      this.saveUsersToLocalStorage();
      this.clearFields();
      this.toggleForm();
    },
    clearFields() {
      this.newUser = {
        username: "",
        email: "",
        password: "",
      };
    },
    toggleEdit(user) {
      user.editing = !user.editing;
    },
    finishEdit(user) {
      user.editing = false;
      this.saveUsersToLocalStorage();
    },
    removeUser(index) {
      this.confirmDeleteIndex = index;
      this.showDeleteConfirmation = true;
    },
    confirmDelete() {
      if (this.confirmDeleteIndex !== -1) {
        this.users.splice(this.confirmDeleteIndex, 1);
        this.saveUsersToLocalStorage();
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
    loadUsersFromLocalStorage() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      this.users = users.map((user) => ({ ...user, editing: false }));
    },
    saveUsersToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
};
</script>

<style>
.user-list__table__head {
  background-color: var(--color-blue-100);
  width: 100%;
  text-align: left;
}

.user-list__table__head__th {
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--color-white);
}

.user-list__form__input {
  color: var(--color-white);
}

.user-list__table {
  width: 100%;
}

.user-list__table__cell {
  padding: 5px;
}

.user-list__table__row:nth-child(odd) {
  background-color: var(--color-gray-100);
}

.user-list__table__cell,
.user-list__table__input {
  width: 170px;

  color: var(--color-white);
}

.user-list__table__cell.action {
  width: 20px;
}

.user-list__table__cell.action span {
  transform: translateY(5px);
}
</style>
