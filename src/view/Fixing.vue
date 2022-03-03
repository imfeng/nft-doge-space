<template>
    <section class="section-duplicate">
        <h1 class="title">
            FIXING
        </h1>
        <div class="content">
            <div class="duplicate-box card">
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

                    <div v-if="currentNft" class="message-box">
                        <h3 class="title">
                            HEX #{{ currentNft.id }}
                        </h3>
                        <p>Energy token cost: {{ currentNft.FixingEnergyCost }} ENG</p>
                    </div>
                </div>
                <div class="wrapper wrapper-right ">
                    <div class="demo-box">
                        <div class="nft-box">
                            <img
                                v-if="!currentNft"
                                class="disabled"
                                v-bind:src="require('@/assets/images/HEX_01a.png')"
                            >
                            <img
                                v-else-if="!isBroken"
                                v-bind:class="{
                                    'flight-white': true,
                                }"
                                v-bind:src="currentNft?.image"
                            >
                            <img
                                v-else
                                v-bind:class="{
                                    'disabled': true,
                                }"
                                v-bind:src="require('@/assets/images/hex_fail.gif')"
                            >
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
                                v-if="isBroken"
                                v-on:click="doFixing"
                                class="btn-scifi"
                            >
                                Do Fixing
                            </button>

                            <template
                                v-if="!isBroken"
                            >
                                <p class="comment comment-success">
                                    Your HEX is Liveness.
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
import { HexNftType, HexStore } from '@/composable/useHex';
import { web3ErrorToMsg } from '@/ethers/utils';
import { GlobalStore } from '@/store/GlobalStore';
import { Web3Store } from '@/store/Web3Store';
const { setLoading, } = GlobalStore;

const {
  myNfts,
  currentNft,
  isBroken,
  refresh,
} = HexStore;
const {
  connectWallet,
  active,
  account,
  HexDogeContract,
} = Web3Store;
const doFixingDone = () => {
  if (currentNft.value) {
    currentNft.value.status = 'liveness';
  }
};

const doFixing = async() => {
  if (currentNft.value) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doFixingDone();
    }, 1000);
    // currentNft.value.deadlineDate = new Date(Date.now() + currentNft.value.DuplicateDuration * 1000);
  }
  if (currentNft.value) {
    try {
      setLoading(true);
      await HexDogeContract.value?.doFixing(currentNft.value.id.toString());
      setTimeout(() => {
        refresh();
      }, 5000);
      setTimeout(() => {
        setLoading(false);
        doFixingDone();
      }, 8000);
    } catch (error) {
      setLoading(false);
      alert(web3ErrorToMsg(error));
    }
  }
};

</script>

<style lang="scss">

</style>
