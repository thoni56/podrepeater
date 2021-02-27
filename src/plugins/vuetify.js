import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import sv from "vuetify/lib/locale/sv";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { sv },
    current: "sv"
  },
  icons: {
    iconfont: "fa"
  }
});
