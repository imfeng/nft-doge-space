<template>
    <div class="app" v-bind:class="[i18n.locale.value, isMobile ? 'mobile' : 'desktop']">
        <!-- <Header></Header> -->
        <RouterView></RouterView>
        <NavBottom></NavBottom>
        <!-- <Footer></Footer> -->
        <Icons></Icons>
    </div>
    <Web3Board></Web3Board>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Web3Board from './ethers/components/Board.vue';
// import Footer from '@/components/Footer.vue';
// import Header from '@/components/Header.vue';
import Icons from '@/components/Icon/Icons.vue';
import NavBottom from '@/components/NavBottom.vue';
import { i18n } from '@/locales/i18n';
import { GlobalStore } from '@/store/GlobalStore';

const { isMobile, } = GlobalStore;

</script>

<style lang="scss">
    @import "@/scss/reset.scss";
    @import "@/scss/global.scss";
    @import '@/scss/global-rwd.scss';
    @import '@/scss/global-animation.scss';
    .app {
        min-height: 100vh;
        background: lighten($onyx, 5%) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAG0lEQVQYV2P8//+/FCMj4zMGJMCIzIGxKRQEAJgPBAbJqUVTAAAAAElFTkSuQmCC) repeat;
        // background: url('~@/assets/images/background.jpg') no-repeat center center;
        // background-size: cover;
    }
</style>
