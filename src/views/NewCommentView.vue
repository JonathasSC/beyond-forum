<template>
  <main class="new-comment">
    <ModelForm :fields="formFields" model="comments" route="/comments" />
  </main>
</template>
<script>
import ModelForm from "../components/ModelForm";

export default {
  name: "NewCommentView",
  components: {
    ModelForm,
  },
  data() {
    return {
      formFields: {
        post_id: "text",
        owner_username: "text",
        text: "textarea",
      },
    };
  },
};
</script>

<style>
.new-comment {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
