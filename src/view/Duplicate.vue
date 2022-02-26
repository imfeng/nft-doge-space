<template>
    <section class="section-duplicate">
        <h1 class="title">
            duplicate
        </h1>
        <div class="content">
            <div class="duplicate-box">
                <div class="wrapper wrapper-left">
                    <p>Select your NFT:</p>
                    <div class="select">
                        <select v-model="currentNft" name="nftid">
                            <option
                                v-for="(item, idx) in myNfts"
                                v-bind:key="idx"
                                v-bind:value="item"
                            >
                                {{ item.id }}
                            </option>
                        </select>
                    </div>
                    <div class="nft-box">
                        <img class="flight" v-bind:src="require('@/assets/images/HEX_01a.png')">
                    </div>
                </div>
                <div class="wrapper wrapper-right card">
                    <div v-if="currentNft" class="detail">

                        <div class="message-box">
                            <h3 class="title">
                                HEX #{{ currentNft.id }}
                            </h3>
                            <p>Duplicate Durations: {{ currentNft.DuplicateDuration }} seconds</p>
                            <p>Success rate: {{ currentNft.SuccessRate }} %</p>
                            <p>Energy token will be earn: {{ currentNft.EnergyEarn }} ENG</p>
                        </div>

                        <div class="control-box">
                            <button class="btn-scifi">
                                Do Duplicate
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavSocial from '@/components/NavSocial.vue';
import { i18n } from '@/locales/i18n';
import Duplicate from '@/view/Duplicate.vue';
type HexNftType = {
    id: number;
  status: 'live' | 'dup' | 'combine' | 'destroy';
  DuplicateDuration: number;
SuccessRate: number;
EnergyEarn: number;
};
const myNfts = ref<HexNftType[]>([]);
const currentNft = ref<HexNftType | null>(null);
myNfts.value = new Array(6).fill(0).map((_, i) => ({
  id: Math.round(Math.random() * 1000) + 1,
  status: 'lock',
  DuplicateDuration: (Math.round(Math.random() * 1000) + 1),
  SuccessRate: (Math.round(Math.random() * 100) + 1),
  EnergyEarn: (Math.round(Math.random() * 10000) + 1000),
}) as unknown as HexNftType);
currentNft.value = myNfts.value[0];
</script>

<style lang="scss">
.section-duplicate {
      background: url('~@/assets/images/planet_universe_galaxy_stars_flash_59622_1920x1080.jpg') no-repeat center center;
      background-size: cover;

    .content {
        padding-bottom: 120px;
        position: relative;
        z-index: 1;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-size: 2rem;
            line-height: 1.5;
        }
        .card {
            // width: 100%;
            // height: 300px;
            padding: .5rem 1.5rem;
            // display: flex;
            background: linear-gradient(0deg, rgba(245, 70, 245, 0.1) 0%, rgba(17, 17, 17, 0) 100%);
            border: 1px #ec46f5 solid;
            border-radius: 5px;
            -webkit-animation: entrance 400ms 800ms linear backwards 1;
            animation: entrance 400ms 800ms linear backwards 1;
        }
        .duplicate-box {
            max-width: 100%;
            width: 1080px;
            display: flex;
            justify-content: center;
            .wrapper {
                max-width: 100%;
                margin: 1rem;
            }
        }
        .wrapper-right {
            flex: 1 1 60%;
            .detail {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 100%;
            }
            .message-box {
                // text-align: center;
            }
            .control-box {
                text-align: center;
            }
        }
        .wrapper-left {
            flex: 1 1 40%;
            // width: 520px;
            .select {
                width: 100%;
                // font-size: 3rem;
            }
        }

        .nft-box {
            padding-top: 20px;
            padding-bottom: 50px;
            text-align: center;
            img {
                // width: 100%;
                height: 300px;
            }
        }
    }
}
</style>
