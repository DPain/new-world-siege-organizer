import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

/**
 * Route level code-splitting
 * This generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 * @param {string} view Name of the view to lazy load.
 * @returns {function} lambda function to lazy load view.
 */
function lazyLoad(view: string) {
  return () => import(/* webpackChunkName: "view" */ `../views/${view}.vue`);
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: lazyLoad('About'),
  },
];

const url: string = process.env.BASE_URL;

const router = new VueRouter({
  mode: 'history',
  base: url,
  routes,
});

export default router;
