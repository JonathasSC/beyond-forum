<template>
  <main class="new-post">
    <ModelForm :fields="formFields" model="posts" route="/post" />
  </main>
</template>

<script>
import ModelForm from "../components/ModelForm";

export default {
  name: "NewPostView",

  components: {
    ModelForm,
  },
  data() {
    return {
      formFields: {
        owner_username: "text",
        title: "text",
        description: "textarea",
      },
    };
  },
};
</script>

<style>
.new-post {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
