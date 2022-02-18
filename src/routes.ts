
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';
export const baseUrl = process.env.VUE_APP_BASEURL;

export function getUrl(path: string) {
  return `${baseUrl}${path}`;
}

const routes: Array<RouteRecordRaw> = [
//   {
//     path: '*',
//     name: 'home',
//     component: Home,
//   },
  {
    path: '/*',
    redirect: getUrl('/'),
  },
 
];
const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return { el: to.hash, };
  } else {
    return false;
  }
};
export const router = createRouter({

  history: createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior,
});
router.afterEach(() => {
  window.scroll(0, 0);
});
