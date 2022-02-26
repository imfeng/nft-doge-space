
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';
import Combine from '@/view/Combine.vue';
import Duplicate from '@/view/Duplicate.vue';
import Fixing from '@/view/Fixing.vue';
import Home from '@/view/Home.vue';
import Mint from '@/view/Mint.vue';
export const baseUrl = process.env.VUE_APP_BASEURL || '/';

export enum RoutePath {
  HOME = 'page-home',
  MINT = 'page-mint',
  DUPLICATE = 'page-duplicate',
  COMBINE = 'page-combine',
  FIXING = 'page-fixing',
}

export function getUrl(path: string) {
  if (path === RoutePath.HOME) {
    return baseUrl;
  }
  return `${baseUrl}${path}`;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: getUrl(RoutePath.HOME),
    name: 'page-home',
    component: Home,

  },
  {
    path: getUrl(RoutePath.MINT),
    name: RoutePath.MINT,
    component: Mint,
  },
  {
    path: getUrl(RoutePath.DUPLICATE),
    name: RoutePath.DUPLICATE,
    component: Duplicate,
  },
  {
    path: getUrl(RoutePath.COMBINE),
    name: RoutePath.COMBINE,
    component: Combine,
  },
  {
    path: getUrl(RoutePath.FIXING),
    name: RoutePath.FIXING,
    component: Fixing,
  },
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
