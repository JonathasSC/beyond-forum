<template>
  <div class="model-addform">
    <h1 class="model-addform__title">Adicionar em {{ model }}</h1>
    <form class="model-addform__form" @submit.prevent="addModel">
      <div
        class="model-addform__input-area"
        v-for="(type, key) in fields"
        :key="key"
      >
        <label class="model-addform__label" :for="key">{{ key }}:</label>
        <textarea
          required
          class="model-addform__input textarea"
          v-if="type == 'textarea'"
          :id="key"
          v-model="newModel[key]"
        ></textarea>

        <input
          class="model-addform__input"
          required
          v-else
          :id="key"
          :type="type"
          v-model="newModel[key]"
        />
      </div>

      <div class="model-addform__btn-area">
        <button class="model-addform__button" type="submit">
          <span>Salvar</span>
        </button>
        <router-link class="model-addform__button" :to="route">
          <span>Cancelar</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ModelForm",
  props: {
    fields: Object,
    model: String,
    route: String,
  },
  data() {
    return {
      newModel: {},
    };
  },
  created() {
    for (const key in this.fields) {
      this.$set(this.newModel, key, "");
    }
  },
  methods: {
    addModel() {
      const genericModel = JSON.parse(localStorage.getItem(this.model)) || [];
      genericModel.push(this.newModel);
      localStorage.setItem(this.model, JSON.stringify(genericModel));
      this.clearFields();
    },
    clearFields() {
      for (const key in this.fields) {
        this.$set(this.newModel, key, "");
      }
    },
  },
};
</script>

<style>
.model-addform__title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.model-addform {
  width: 100%;
  max-width: 720px;
}

.model-addform__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.model-addform__title {
  color: var(--color-white);
}

.model-addform__label {
  color: var(--color-blue-100);
  font-weight: bold;

  width: 10rem;
}

.model-addform__label:hover {
  color: var(--color-blue-50);
}

.model-addform__input-area {
  display: flex;
}

.model-addform__btn-area {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

.model-addform__input {
  color: var(--color-white);
  width: 14rem;
  border: 0.1rem solid var(--color-gray-50);
  border-radius: 0.2rem;
}

.model-addform__input.textarea {
  width: 20rem;
  height: 10rem;
}

.model-addform__button {
  margin-top: 1rem;
  background-color: var(--color-blue-100);
  padding: 0.4rem 0.6rem;
  border-radius: 0.2rem;
}

.model-addform__button:hover {
  background-color: var(--color-blue-200);
}

.model-addform__button span {
  color: var(--color-white);
  font-weight: bold;
}
</style>
