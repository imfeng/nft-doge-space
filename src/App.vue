<template>
    <div class="app" v-bind:class="[i18n.locale.value, isMobile ? 'mobile' : 'desktop']">
        <Header></Header>
        <RouterView></RouterView>
        <Footer></Footer>
        <BottomFunction class="mobile"></BottomFunction>
        <Icons></Icons>
    </div>
    <Web3Board></Web3Board>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Web3Board from './ethers/components/Board.vue';
import BottomFunction from '@/components/BottomFunction.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Icons from '@/components/Icon/Icons.vue';
import { i18n } from '@/locales/i18n';
import { GlobalStore } from '@/store/GlobalStore';

const { isMobile, } = GlobalStore;

</script>

<style lang="scss">
    @import "@/scss/reset.scss";
    @import "@/scss/global.scss";
    @import '@/scss/global-rwd.scss';
    @import '@/scss/global-animation.scss';
</style>
