<template>
    <section class="section-mint">
        <h1 class="title">
            mint
        </h1>
        <div class="content">
            <div class="mint-box">
                <div class="mint-wrapper">
                    <h3 class="title mobile">
                        HEX NFT
                    </h3>
                    <div class="nft-gallery">
                        <img
                            class="flight-white"
                            v-bind:src="require('@/assets/images/gifhexdoge.gif')"
                            alt="gifhexdoge.gif"
                        >
                    </div>
                    <h4 class="title font-blackopsone">
                        2131 / 6666
                    </h4>
                    <hr>
                    <div class="price-info-box font-blackopsone">
                    <!-- <p class="mint-price">
                            Genesis price: <span class="price">0.05 ETH</span> (Sep. 2021)
                        </p> -->
                    <!-- <p class="mint-price">
                        Pre-sale: <span class="price">TBD</span>
                    </p>
                    <p class="mint-price">
                        Public sale: <span class="price">TBD</span>
                    </p> -->
                    </div>
                </div>
                <div class="mint-wrapper mint-wrapper-controller font-blackopsone">
                    <div class="info-box">
                        <p>
                            {{ mintNum }} HEXNFT {{ currentPrice }} ETH
                        </p>
                    </div>
                    <div class="mint-input-box info-box">
                        <button v-on:click="mintNumController(-1)" class="decrease">
                            <SvgIcon
                                v-bind:iconName="'icon-minus'"
                                class="icon-svg"
                            ></SvgIcon>
                        </button>

                        <input
                            v-model="mintNum"
                            min="0"
                            max="20"
                            type="number"
                            class="input-mint-num"
                        >
                        <button v-on:click="mintNumController(1)" class="increase">
                            <SvgIcon
                                v-bind:iconName="'icon-plus'"
                                class="icon-svg"
                            ></SvgIcon>
                        </button>
                    </div>
                    <div
                        v-if="!active"
                        v-on:click="connectWallet"
                        class="active info-box"
                    >

                        <p>CONNECT WALLET</p>
                    </div>
                    <div
                        v-else
                        class="active info-box"
                    >
                        <button class="pluto-button connect-button" v-on:click="doMint">
                            MINT
                        </button>
                    </div>
                    <div
                        v-if="active"
                        class="comment message"
                    >
                        <p>Address: {{ shortenAddress(account) }}</p>
                    </div>
                <!-- <div
                        class="info-box message succeed"
                    >

                        <p>Succeed!</p>
                    </div> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import { ethers } from 'ethers';
import { computed, ref, watch } from 'vue';
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import NavSocial from '@/components/NavSocial.vue';
import { shortenAddress } from '@/ethers/utils/format';
import { i18n } from '@/locales/i18n';
import { Web3Store } from '@/store/Web3Store';
const PRICE = 0.001;
const mintNum = ref(1);
const mintNumController = (add = 1) => {
  mintNum.value += add;
};
const currentPrice = computed(() => Math.round(mintNum.value * PRICE * 1000) / 1000);

const {
  connectWallet,
  active,
  account,
  HexDogeContract,
} = Web3Store;
watch(mintNum, (newVal) => {
  mintNum.value = Math.min(Math.max(newVal, 1), 20);
});
const doMint = async() => {
  HexDogeContract.value?.mint(account.value, mintNum.value.toString())
    .send({
      from: account.value,
      value: ethers.utils.parseEther(currentPrice.value.toString()).toString(),
    })
    .then(() => {
      alert('Success');
    }).catch((err: any) => {
      console.log(err);
    });
};
</script>

<style lang="scss">
.section-mint {

      background: url('~@/assets/images/galaxy_earth_network_126341_1920x1080.jpg') no-repeat center bottom;

      $mint-box-width: 850px;
  $mint-box-height: 501px;
  $mint-box-padding: 0;

  // 850 * 501
  .mint-box {
      margin: 0 auto;
      position: relative;
      z-index: 3;
    padding: $mint-box-padding;
    // background: #C13BEB;
    width: 520px;
    // width: $mint-box-width;
    // height: $mint-box-height;
    max-width:100%;
    min-width: $mint-box-height;
    // background: url("~@/assets/images/mint-pad.png") left top no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mint-wrapper {
      flex: 1 1 0;
      padding: 10px;
      width: 100%;
      .title {
          text-align: center;
      }

      &.mint-wrapper-controller {
        display: flex;
        flex-direction: column;
        height: 40%;
        max-width: 330px;
        .comment {
            text-align: center;
            font-size: 1.5rem;
        }
        .info-box {
            padding: 1rem 0;
            cursor: pointer;
            text-align: center;
            font-size: 1.6rem;
          flex: 1 1 0;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.7);
        //   background-color: rgba(255, 255, 255, 0.7);
          margin: 0;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d2d2d2;

          &:not(:last-child) {
            margin-bottom: 10px;
          }

          &.active {
              color: #d2d2d2;
              font-size: 2rem;
                background-color: #ffff0091;
          }
            &.message {
                font-size: 1.3rem;
                &.disabled {
                    background-color: rgba(255, 255, 255, 0.3);
                }
                &.succeed {
                    background-color: #47d62b;
                }
            }
          .pluto-button {
            box-shadow: none;
            background-color: transparent;
            width: 100%;
            height: 100%;
          }

          &.mint-input-box {
              border: none;
              padding: 0;
            background: none;
            display: flex;

            &>* {
                border-radius: 10px;
                // flex: 1 1 77px;
              vertical-align: middle;
              height: 100%;
              color: #2d2d2d;
              justify-content: space-between;
              &:not(:first-child) {
                  margin-left: 10px;
              }
            }

            &>button {
            //   background: black;
            //   border-radius: 50%;
            //   width: 50px;
            //   height: 50px;
                            // width: 100%;
                flex: 1 1 0;
              font-size: 3rem;
              line-height: 1;
              text-align: center;
              text-indent: -2px;

              svg {
                padding: 5px;
                width: 25px;
                height: 25px;
                fill: #2d2d2d;
                margin: 0;
              }
            }

            .input-mint-num {
                          background-color: rgba(255, 255, 255, 0.7);
                width: 40%;
                text-align: center;

              border: none;
              // margin: 0 1rem;
            //   border-radius: 15px;
              // width: 168px;
              // height: 55px;
              font-size: 2rem;

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }

              /* Firefox */
              &[type=number] {
                -moz-appearance: textfield;
              }
            }

          }
        }
      }

    }

    .price-info-box {
      // text-align: left;

      .mint-price {
        text-align: center;
        font-size: 1.2rem;
        margin: .5rem auto;
        color: #f2f2f2;

        .price {
          font-weight: bold;
          // color: red;
        }
      }

    }

    .nft-gallery {
    //   background-color: rgba(136, 136, 136, 0.25);
      width: 100%;
      // height: 100%;
      padding-bottom: 50px;
      text-align: center;
      border-radius: 15px;

      img {
        max-width: 220px;
        width: 100%;
        // border-radius: 50%;
      }
    }

    h4.title {
      text-align: center;
      font-size: .2.5rem;
      color: #f2f2f2;
    }

    hr {
      border-bottom: 2px solid #bdbfbf;
      width: 100%;
      margin: .5rem auto;
    }

    .mint-button {
      width: 168px;
      background: black;
      box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      padding: 1rem 2rem;
    }

  }
}
</style>
