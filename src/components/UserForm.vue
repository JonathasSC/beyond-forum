<template>
  <div class="post__crud">
    <h1>Add User</h1>
    <form class="post__crud__form" @submit.prevent="addUser">
      <div class="form__input__area">
        <label for="username" class="form__input__label"> Username </label>
        <input
          id="username"
          class="form__input"
          type="text"
          v-model="newUser.username"
          required
        />
      </div>

      <div class="form__input__area">
        <label for="email" class="form__input__label">Email:</label>
        <input
          id="email"
          class="form__input"
          type="text"
          v-model="newUser.email"
          required
        />
      </div>

      <div class="form__input__area">
        <label for="password" class="form__input__label">Password:</label>
        <input
          id="password"
          class="form__input"
          type="password"
          v-model="newUser.password"
          required
        />
      </div>

      <div class="form__button__area">
        <button class="form__button" type="submit">Adicionar</button>
        <router-link class="form__button" to="/user">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  components: {},
  data() {
    return {
      newUser: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    addUser() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(this.newUser);
      localStorage.setItem("users", JSON.stringify(users));
      this.clearFields();
    },
    clearFields() {
      this.newUser = {
        username: "",
        email: "",
        password: "",
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
