import { createApp } from 'vue';
import Vue3Marquee from 'vue3-marquee';
import App from './App.vue';
import { VueDapp } from '@/ethers/plugin';
import { i18nInstance } from '@/locales/i18n';
import { router } from '@/routes';
import 'vue3-carousel/dist/carousel.css';
// import 'video.js/dist/video-js.css';

const app = createApp(App);
app.use(i18nInstance);
app.use(router);
app.use(Vue3Marquee);
app.use(VueDapp, {
  infuraId: process.env.VUE_APP_infuraId,
  appName: process.env.VUE_APP_appName,
  appUrl: process.env.VUE_APP_appUrl,
});
app.mount('#app');
