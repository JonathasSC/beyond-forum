<template>
  <div class="crud">
    <div class="crud__internal__container">
      <div class="crud__formtoggle">
        <button @click="toggleForm" v-if="!showForm">ADD PERSON +</button>
      </div>
      <form class="crud__form" @submit.prevent="addUser" v-if="showForm">
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newUser.username"
          placeholder="username"
        />
        <input
          class="crud__form__input"
          type="text"
          required
          v-model="newUser.email"
          placeholder="email"
        />
        <input
          class="crud__form__input"
          type="password"
          required
          v-model="newUser.password"
          placeholder="password"
        />
        <button class="crud__form__button" type="submit">Adicionar</button>
        <button @click="toggleForm" v-if="showForm" class="crud__form__button">
          Cancelar
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
              type="text"
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
  name: "UserCrud",
  components: {},
  data() {
    return {
      users: [
        {
          username: "Jonathas",
          email: "jonathas@example.com",
          password: "senha123",
          editing: false,
        },
        {
          username: "Maria",
          email: "maria@example.com",
          password: "maria456",
          editing: false,
        },
      ],
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
    },
    removeUser(index) {
      this.users.splice(index, 1);
    },
    onChangePage(page) {
      this.currentPage = page;
    },
    toggleForm() {
      this.showForm = !this.showForm;
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
