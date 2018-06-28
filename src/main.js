// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import seller from './components/seller';
import talk from './components/talk';
import order from './components/order';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);

// These can be imported from other files
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: h => h(App),
//   components: { App },
//   template: '<App/>'
// });

const routes = [
  {path: '/seller',component:seller},
  {path: '/talk',component:talk},
  {path: '/order',component:order},
  { path: '/', redirect: '/order'}
]


const router = new VueRouter({
  routes,
  linkActiveClass: 'active1'
})

// router.go('/order');

const app = new Vue({
  router,
    render: h => h(App),
}).$mount('#app');