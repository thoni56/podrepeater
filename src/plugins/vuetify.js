import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import sv from "vuetify/lib/locale/sv";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.devtools = true;

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
