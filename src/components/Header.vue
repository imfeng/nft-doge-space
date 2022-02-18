<template>
    <section class="section-header">
        <header>
            <div class="nav-top container">
                <div class="content">
                    <NavSocial class="desktop"></NavSocial>
                    <div class="dropdown-box">
                        <select class="dropdown" v-model="currentLocale">
                            <option
                                v-for="langItem in languageFileMap"
                                v-bind:key="langItem.name"
                                v-bind:value="langItem.name"
                            >
                                {{ langItem.title }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <nav class="nav-main container">
                <div class="content content-nav">
                    <ul v-if="!isMobile" class="nav-box-left nav-box">
                        <!-- <li v-for="(item, idx) in navMainLeftList" v-bind:key="idx">
                            {{ item.title }}
                        </li> -->
                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#info')">
                            <li>{{ i18n.t('HEADER_INFO') }}</li></RouterLink>
                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#roadmap')">
                            <li>{{ i18n.t('HEADER_ROADMAP') }}</li></RouterLink>
                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#team')">
                            <li>{{ i18n.t('HEADER_TEAM') }}</li></RouterLink>
                    </ul>
                    <div class="logo-box">
                        <RouterLink v-bind:to="getUrl('/')">
                        </RouterLink>
                    </div>
                    <ul v-if="!isMobile" class="nav-box-right nav-box">
                        <!-- <li v-for="(item, idx) in navMainRightList" v-bind:key="idx">
                            {{ item.title }}
                        </li> -->
                        <RouterLink v-bind:to="getUrl('/mint')">
                            <li>{{ i18n.t('HEADER_MINT') }}</li>
                        </RouterLink>
                        <li v-if="!active" v-on:click="connectWallet">
                            <div class="connect-button">
                                <p>- {{ i18n.t('HEADER_CONNECT') }} -</p>
                            </div>
                        </li>
                        <li
                            v-else
                            v-on:click="connectWallet"
                            class="wallet-profile"
                        >
                            {{ account }}
                        </li>
                        <!-- <RouterLink>

                        </RouterLink> -->
                    </ul>
                    <Menu
                        v-if="isMobile"
                        class="button-menu-box"
                        right
                        Push
                        v-bind:closeOnNavigation="true"
                    >
                        <NavSocial></NavSocial>

                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#info')">
                            <span>{{ i18n.t('HEADER_INFO') }}</span></RouterLink>
                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#roadmap')">
                            <span>{{ i18n.t('HEADER_ROADMAP') }}</span></RouterLink>
                        <RouterLink class="link-fixed" v-bind:to="getUrl('/#team')">
                            <span>{{ i18n.t('HEADER_TEAM') }}</span></RouterLink>
                        <RouterLink v-bind:to="getUrl('/mint')">
                            <span>{{ i18n.t('HEADER_MINT') }}</span>
                        </RouterLink>
                        <a
                            v-if="!active"
                            v-on:click="connectWallet"
                            class="connect-button-box"
                        >
                            <div class="connect-button">
                                <p>- {{ i18n.t('HEADER_CONNECT') }} -</p>
                            </div>
                        </a>
                        <li
                            v-else
                            v-on:click="connectWallet"
                            class="wallet-profile"
                        >
                            {{ account }}
                        </li>
                    </Menu>
                </div>
            </nav>
        </header>
    </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Slide as Menu } from 'vue3-burger-menu'; // import the CSS transitions you wish to use, in this case we are using `Slide`
import NavSocial from '@/components/NavSocial.vue';
import { i18n, languageFileMap, currentLocale } from '@/locales/i18n';
import { getUrl } from '@/routes';
import { GlobalStore } from '@/store/GlobalStore';
import { Web3Store } from '@/store/Web3Store';
const { connectWallet, active, account, } = Web3Store;

const { isMobile, } = GlobalStore;

</script>

<style lang="scss">
@import '~@/scss/foundation/config';

.section-header {
    padding: 26px 0;

    .wallet-profile {
        border: 2px solid $primary-color-1;
        border-radius: 10px;
        max-width: 110px;
        overflow: hidden;
        text-overflow : ellipsis;

    }
        .content-nav {
            height: 100%;
        }
    .nav-top {
        height: 38px;
        background-color: $primary-color-1;

        .content {
            align-content: center;
            justify-content: space-between;
        }

        .nav-box-social {
            width: 200px;

            svg {
                fill: $bg-color;
                height: 30px;
                width: 30px;
                &:hover {
                    fill: rgb(71, 71, 71);
                }
            }

        }
    }
    .button-menu-box {
        .nav-box-social {
            li {
                overflow: hidden;
                cursor: pointer;
                svg:hover {
                    fill: white;
                }
            }
        }
    }

    .nav-main {
        height: 96px;
        border-bottom: 4px solid $primary-color-1;
        display: flex;
        align-items: center;
        justify-content: center;

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-box {
            .link-fixed {
                color: $primary-color-1!important;
            }
            &.nav-box-left,
            &.nav-box-right {
                width: 33%;
                justify-content: space-between;
            }
        }

        .logo-box {
            padding: 0;
            margin-top: -28px;
            z-index: 5;

            img {
                height: 180px;
            }
        }

    }

    .header-content {
        height: 500px;
    }

    .dropdown-box {
        display: flex;
        justify-content: center;
        align-content: center;
    }
}

@media only screen and (max-width: 860px) {
    .section-header {
        .button-menu-box {
            position: relative;
            overflow: hidden;
            height: 29px;
            width: 29px;
            .wallet-profile {
                display: block;
                margin: 1rem;
                width: 200px;
                max-width: 85%;
                border-color: $primary-color-3;
                color: $primary-color-3;
            }
            .bm-menu {
                background-color: $primary-color-1;

                .nav-box-social {
                    ul > li {
                        .icon-svg {
                            fill: $primary-color-3;
                            height: 40px;
                            width: 40px;
                        }
                    }
                }
            }
            .bm-burger-button {
                position: initial;
            }
            .bm-cross-button {
                &::before {
                    position: absolute;
                    content: "";
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    border: 1px solid gray;
                    top: -5px;
                    right: 14px;
                }
                height: 36px;
                width: 36px;
                .bm-cross {
                    width: 6px !important;
                    height: 28px !important;
                    background-color: rgb(24, 24, 24);
                }
            }
            .bm-item-list {
                a > span {
                    color: $primary-color-3;
                    line-height: 2;
                }
                a, .nav-box {
                    border-bottom: 2px dashed $primary-color-3;
                    &.connect-button-box {
                        border: none;
                        width: 100%;
                        margin: 1.5rem auto;
                        .connect-button {
                            width: 260px;
                            max-width: 88%;
                            height: 66px;
                            p {
                                padding-right: 15px;
                            }
                        }
                    }
                }
            }
        }
        padding: 13px 0;
        position: relative;
        .nav-top {
            height: 28px;
            & > .content {
                padding: 0 1rem;
                justify-content: flex-end!important;
            }
        }
        .nav-main {
            height: 54px;
            .logo-box {
                position: absolute;
                left: 0;
                top: 0;
                padding: 0;
                margin: 0;
                img {
                    height: 108px;
                }
            }
            .nav-box-left, .nav-box-right {
                display: none;
            }

            .content-nav {
                justify-content: flex-end;
                padding-right: 1.5rem;
            }

        }
    }
}
@media only screen and (min-width: 861px) {
    .app.zh-tw, .app.zh-cn {
        .nav-box > a, .nav-box > li {
            margin: 0 0.1rem;
            padding: 0.1rem;
        }
    }
}
</style>
