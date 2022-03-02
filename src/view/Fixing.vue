<template>
    <section class="section-fixing">
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
                        <img
                            v-if="!currentNft"
                            class="flight"
                            v-bind:src="require('@/assets/images/HEX_01a.png')"
                        >
                        <img
                            v-else
                            class="flight-white"
                            v-bind:src="currentNft.image"
                        >

                    </div>
                </div>
                <div class="wrapper wrapper-right card">
                    <div v-if="currentNft" class="detail">

                        <div class="message-box">
                            <h3 class="title">
                                HEX #{{ currentNft.id }}
                            </h3>
                            <p>FIXING COST: {{}}</p>
                            <p>FIXING Durations: {{ currentNft.DuplicateDuration }} seconds</p>                        </div>

                        <div class="control-box">
                            <button
                                v-if="currentNft.status === 'broken'"
                                v-on:click="doDuplicate"
                                class="btn-scifi"
                            >
                                Do Fixing
                            </button>
                            <template
                                v-if="currentNft.status === 'broken'"
                            >
                                <p class="comment comment-error">
                                    Your
                                </p>
                            </template>
                            <!-- {{ currentNft.status }} -->

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HexNftType } from '@/composable/useHex';
const statusList: string[] = ['live', 'dupicate_done', 'broken', ];

const myNfts = ref<HexNftType[]>([]);
const currentNft = ref<HexNftType | null>(null);
myNfts.value = new Array(6).fill(0).map((_, i) => ({
  id: Math.round(Math.random() * 1000) + 1,
  status: getRandomFromArray(statusList),
  DuplicateDuration: (Math.round(Math.random() * 10) + 1),
  SuccessRate: (Math.round(Math.random() * 100) + 1),
  EnergyEarn: (Math.round(Math.random() * 10000) + 1000),
  image: require(`@/assets/images/hex/${Math.round(Math.random() * 6) + 1}.png`),
  deadlineDate: null,
}) as unknown as HexNftType);
currentNft.value = myNfts.value[0];

const doDuplicateDone = () => {
  if (currentNft.value) {
    // currentNft.value.status = 'dupicate_done';
  }
};
const doClaimAll = () => {
  if (currentNft.value) {
    // currentNft.value.status = 'live';
  }
};
const doDuplicate = () => {
  if (currentNft.value) {
    currentNft.value.status = 'duplicating';
    // currentNft.value.deadlineDate = new Date(Date.now() + currentNft.value.DuplicateDuration * 1000);
    setTimeout(() => {
      doDuplicateDone();
    }, currentNft.value.DuplicateDuration * 1000);
  }
};
const goFixing = () => {

};

function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style lang="scss">
.section-fixing {
      background: url('~@/assets/images/space_planets_takeoff_explosion_1920x1080.jpg') no-repeat center center;
      background-size: cover;

    .content {

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
                .comment-error {
                    color: #fb3333;
                }
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
