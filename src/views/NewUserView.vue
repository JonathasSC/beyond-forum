<template>
  <main class="new-user">
    <ModelForm :fields="formFields" model="users" route="/user" />
  </main>
</template>

<script>
import ModelForm from "../components/ModelForm";

export default {
  name: "NewUserForm",

  components: {
    ModelForm,
  },
  data() {
    return {
      formFields: {
        username: "text",
        email: "text",
        password: "text",
      },
    };
  },
};
</script>

<style>
.new-user {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
