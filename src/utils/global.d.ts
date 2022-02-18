/* eslint-disable camelcase */
declare module 'vue3-marquee';
declare module 'vue3-carousel';
declare module 'vue3-burger-menu';
declare global {
  namespace window {
    declare const ethereum: EthereumProvider;
  }
    namespace NodeJS {
        interface ProcessEnv {
          NODE_ENV: 'development' | 'production';
            VUE_APP_appName: string;
            VUE_APP_infuraId: string;
            VUE_APP_appUrl: string;
        }
      }
}
