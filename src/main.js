import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import store from './store';
import './components';

import './assets/sass/index.scss';

Vue.config.productionTip = false;

Vue.filter('date', (value) => {
  if (!value) { return ''; }
  return moment(String(value)).format('DD.MM.YYYY');
});

Vue.filter('amount', (value) => {
  if (!value) { return ''; }
  return value.toLocaleString();
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
