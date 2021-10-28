import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "axios";
import VueSwal from "vue-swal";
import VueMoment from "vue-moment";
import VModal from "vue-js-modal";
import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VModal);
Vue.use(VueMoment, {});
Vue.use(VueSwal);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
