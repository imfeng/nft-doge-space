<template>
    <nav class="nav-box nav-box-social">
        <ul class="flexbox">
            <!-- <li>
                <SvgIcon v-bind:iconName="'icon-facebook'" class="icon-facebook"></SvgIcon>
            </li> -->
            <li>
                <a target="_blank" href=""><SvgIcon v-bind:iconName="'icon-twitter'" class="icon-svg icon-twitter"></SvgIcon></a>
            </li>
            <!-- <li>
                <a target="_blank" href=""><SvgIcon v-bind:iconName="'icon-instagram'" class="icon-svg icon-instagram"></SvgIcon></a>
            </li> -->
            <li>
                <a target="_blank" href=""><SvgIcon v-bind:iconName="'icon-dc'" class="icon-svg icon-dc"></SvgIcon></a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/Icon/SvgIcon.vue';

</script>

<style lang="scss">
@import '~@/scss/foundation/config';

.nav-top {
    .nav-box-social {
        justify-content: flex-start;

    }
}

.nav-box-social {
    ul {
        display: flex;
        // justify-content: center;
        // align-content: center;
        align-items: center;

        li {
            padding: 3px 0;
            margin: 0 .2rem;
            margin-top: 2px;
            overflow: hidden;
            cursor: pointer;
            .icon-svg {
                fill: $primary-color-1;
                width: 30px;
                height: 30px;
                &:hover {
                    fill: white;
                }
            }
            a {
                border: none!important;
            }
        }
    }
}
</style>
