<template>
    <nav class="nav-bottom">
        <div class="nav-box">
            <RouterLink v-bind:to="getUrl(RoutePath.HOME)" class="nav-item active">
                <p>HOME</p>
            </RouterLink>
            <RouterLink v-bind:to="getUrl(RoutePath.MINT)" class="nav-item">
                <p>MINT</p>
            </RouterLink>
            <RouterLink v-bind:to="getUrl(RoutePath.DUPLICATE)" class="nav-item">
                <p>DUPLICATE</p>
            </RouterLink>
            <RouterLink v-bind:to="getUrl(RoutePath.COMBINE)" class="nav-item">
                <p>COMBINE</p>
            </RouterLink>
            <RouterLink v-bind:to="getUrl(RoutePath.FIXING)" class="nav-item">
                <p>FIXING</p>
            </RouterLink>
            <div class="nav-item">
                <NavSocial></NavSocial>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import NavSocial from '@/components/NavSocial.vue';
import { getUrl, RoutePath } from '@/routes';
import { GlobalStore } from '@/store/GlobalStore';
</script>

<style lang="scss">
@import '~@/scss/foundation/config';

.nav-bottom {
    $boder-color: rgba(254, 243, 255, 0.75);
    color: rgb(254, 240, 255);
    position: fixed;
    bottom: 0;
    width: 100%;
    // background: rgba(255, 255, 255, 0.187);
    // height: 100px;
    border-top: 1px solid $boder-color;
    .nav-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .nav-item {
            cursor: pointer;
            color: #d9d9d9;
            margin: 0;
            padding: 1.3rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex: 1 1 0;
            font-size: 2rem;
            text-align: center;
            border-right: 1px solid $boder-color;
            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            &.router-link-active {
                color: white;
                background: rgba(226, 83, 255, .7);
            }
        }
    }

}
@media only screen and (min-width: 861px) {

}
</style>
