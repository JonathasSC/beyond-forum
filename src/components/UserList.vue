<template>
  <div class="crud">
    <div class="crud__internal__container">
      <div class="crud__formtoggle">
        <router-link to="/newuser">ADD USER +</router-link>
      </div>
      <form class="crud__form" @submit.prevent="addUser" v-if="showForm">
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newUser.username"
          placeholder="Username"
        />
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newUser.email"
          placeholder="Email"
        />
        <input
          class="crud__form__input"
          type="password"
          required
          v-model="newUser.password"
          placeholder="Password"
        />
        <button class="crud__form__button" type="submit">Add</button>
        <button @click="toggleForm" v-if="showForm" class="crud__form__button">
          Cancel
        </button>
      </form>

      <table class="crud__table">
        <tr
          class="crud__table__row"
          v-for="(user, index) in paginatedUsers"
          :key="index"
        >
          <td class="crud__table__cell">
            <span v-if="!user.editing">{{ user.username }}</span>
            <input
              v-else
              type="text"
              class="crud__table__input"
              v-model="user.username"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="crud__table__cell">
            <span v-if="!user.editing">{{ user.email }}</span>
            <input
              v-else
              type="text"
              class="crud__table__input"
              v-model="user.email"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="crud__table__cell">
            <span v-if="!user.editing">{{ user.password }}</span>
            <input
              class="crud__table__input"
              v-else
              type="password"
              v-model="user.password"
              @blur="finishEdit(user)"
            />
          </td>

          <td class="crud__table__cell action">
            <button class="crud__table__btn" @click="toggleEdit(user)">
              <span class="material-symbols-outlined">
                {{ user.editing ? "save" : "edit" }}
              </span>
            </button>
          </td>

          <td class="crud__table__cell action">
            <button class="crud__table__btn" @click="removeUser(index)">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </td>
        </tr>
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
  name: "UserList",
  components: {},
  data() {
    return {
      users: [],
      newUser: {
        username: "",
        email: "",
        password: "",
      },
      itemsPerPage: 5,
      currentPage: 1,
      showForm: false,
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
      this.users.splice(index, 1);
      this.saveUsersToLocalStorage();
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
.crud {
  gap: 2rem;
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  border-bottom: 1px solid red;
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
</style>
