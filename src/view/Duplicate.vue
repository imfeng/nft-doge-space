<template>
    <section class="section-duplicate">
        <h1 class="title">
            duplicate
        </h1>
        <div class="content">
            <div class="duplicate-box card">
                <div class="wrapper wrapper-left">
                    <!-- {{ myNfts }} -->
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

                    <div v-if="currentNft" class="message-box">
                        <h3 class="title">
                            HEX #{{ currentNft.id }}
                        </h3>
                        <p>Duplicate Durations: {{ currentNft.DuplicateDuration }} seconds</p>
                        <p>Success rate: {{ currentNft.DuplicateSuccessRate }} %</p>
                        <p>Energy token will be earn: {{ currentNft.DuplicateEnergyEarn }} ENG</p>
                    </div>
                </div>
                <div class="wrapper wrapper-right ">
                    <div class="refresh-box">
                        <button
                            v-on:click="refresh"
                            class="btn-refresh"
                            v-bind:class="{
                                isRefreshing: isRefreshing
                            }"
                        >

                        </button>
                    </div>
                    <div class="demo-box">
                        <div class="nft-box">
                            <img
                                v-if="!currentNft"
                                class="flight"
                                v-bind:src="require('@/assets/images/HEX_01a.png')"
                            >
                            <img
                                v-else
                                v-bind:class="{
                                    'flight-white': !isDuplicating,
                                }"
                                v-bind:src="currentNft.image"
                            >
                            <div
                                class="nft-offspring"
                                v-bind:class="{
                                    disabled: !isDuplicating && !isDuplicatingDone,
                                    duplicating: isDuplicating,
                                }"
                            >
                                <img
                                    v-bind:class="{
                                        'flight-white': isDuplicating || isDuplicatingDone,
                                    }"
                                    v-bind:src="require('@/assets/images/A_1.gif')"
                                >
                            </div>
                        </div>
                        <!-- <div class="arrow-box">
                            <div class="arrowSliding">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay1">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay2">
                                <div class="arrow"></div>
                            </div>
                            <div class="arrowSliding delay3">
                                <div class="arrow"></div>
                            </div>

                        </div> -->

                    </div>
                    <div v-if="currentNft" class="detail">

                        <div class="control-box">
                            <button
                                v-if="currentNft.status === 'liveness'"
                                v-on:click="doDuplicate"
                                class="btn-scifi"
                            >
                                Do Duplicate
                            </button>
                            <button
                                v-if="currentNft.status === 'dupicate_done'"
                                v-on:click="doClaimAll"
                                class="btn-scifi"
                            >
                                Claim All
                            </button>
                            <template
                                v-if="currentNft.status === 'duplicating'"
                            >
                                <p class="comment">
                                    Duplicating......
                                </p>
                                <Countdown
                                    v-bind:deadlineDate="currentNft.DuplicateDoneDate"
                                    v-bind:showDays="false"
                                    mainColor="#fa53ec"
                                    labelColor="#fa53ec"
                                />
                            </template>
                            <template
                                v-if="currentNft.status === 'broken'"
                            >
                                <p class="comment comment-error">
                                    Oh... Your HEX #{{ currentNft.id }} got broken.
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
import { ref, computed, watch } from 'vue';
import { Countdown } from 'vue3-flip-countdown';
import { HexStore, HexNftType } from '../composable/useHex';
import { web3ErrorToMsg } from '@/ethers';
import { GlobalStore } from '@/store/GlobalStore';
import { Web3Store } from '@/store/Web3Store';
const { setLoading, } = GlobalStore;

const {
  myNfts,
  currentNft,
  isDuplicating,
  isDuplicatingDone,
  refresh,
  isRefreshing,
} = HexStore;
const {
  connectWallet,
  active,
  account,
  HexDogeContract,
} = Web3Store;
const doDuplicateDone = () => {
  if (currentNft.value) {
    currentNft.value.status = 'dupicate_done';
  }
};
watch(currentNft, (newVal, oldVal) => {
  if (newVal?.id === oldVal?.id) return;
  if (currentNft.value) {
    if (isDuplicating.value && currentNft.value.DuplicateDoneDate && new Date().getTime() >= currentNft.value.DuplicateDoneDate.getTime()) {
      setTimeout(() => {
        doDuplicateDone();
      }, 2000);
    }
  }
});

const doClaimAll = async() => {
  if (currentNft.value) {
    try {
      setLoading(true);
      await HexDogeContract.value?.doClaimAll(currentNft.value.id.toString());
      setTimeout(() => {
        refresh();
      }, 6000);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
      setTimeout(() => {
        refresh();
      }, 10000);
    } catch (error) {
      setLoading(false);
      alert(web3ErrorToMsg(error));
    }
  }
};
const doDuplicate = async() => {
  if (currentNft.value) {
    try {
      setLoading(true);
      await HexDogeContract.value?.doDuplicate(currentNft.value.id.toString());
      currentNft.value.status = 'duplicating';
      currentNft.value.DuplicateDoneDate = new Date(Date.now() + currentNft.value.DuplicateDuration * 1300);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      setTimeout(() => {
        refresh();
      }, currentNft.value.DuplicateDuration * 1300);
    } catch (error) {
      setLoading(false);
      alert(web3ErrorToMsg(error));
    }
  }
};
const goFixing = () => {

};

function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style lang="scss">
.section-duplicate {
      background: url('~@/assets/images/planet_universe_galaxy_stars_flash_59622_1920x1080.jpg') no-repeat center center;
      background-size: cover;

    .content {

        p {
            font-size: 1.5rem;
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
            flex: 1 1 55%;
            .detail {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                min-height: 100px;
                // height: 100%;
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
            flex: 1 1 45%;
            // width: 520px;
            .select {
                width: 100%;
                // font-size: 3rem;
            }
        }
        .demo-box {
            text-align: center;

        }
        .nft-box {
            position: relative;
            padding-top: 20px;
            padding-bottom: 50px;
            & > img {
                // width: 100%;
                height: 250px;
                &.disabled {
                    filter: grayscale(1);
                }
            }
            .nft-offspring {
                position: absolute;
                bottom: 50px;
                right: -60px;
                opacity: 1;
                img {
                    width: 140px;
                    height: auto;
                }

                &.duplicating {
                    animation: blink 1s infinite;
                }

                &.disabled {
                    opacity: 0;
                    bottom: 0;
                    filter: grayscale(1);
                }
            }
        }
        .demo-box {
            & > * {
                display: inline-block;
            }

        }
    }
}
</style>
