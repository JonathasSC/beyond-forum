import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#4d6ce1",

        blue100: "#4d6ce1",
        blue200: "#435cb6",
        
        gray50: "#606166",
        gray100: "#292a2e",
        gray200: "#202125",
      },
    },
  },
});
