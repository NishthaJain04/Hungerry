import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// import i18n from '@/i18n/lang'
// import Filter from './filter'

import 'assets/scss/index.scss'
import Blue from '@blibli/dls'
import '@blibli/dls/dist/blue.min.css'

Vue.use(Blue);

// Vue.use(Filter);

Vue.mixin({
  methods: {
    // i18n: i18n
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
