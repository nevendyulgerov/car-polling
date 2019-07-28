import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

// load plugins
import './plugins/vuetify';
import './plugins/meta';
import './plugins/vuelidate';
import './plugins/casl';
import './plugins/moment';

// load utils
import './utils/globals';
import './utils/api';
import './utils/common';

// register service worker
import './registerServiceWorker';

// customize config
Vue.config.productionTip = false;

// instantiate app
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
