<template>
    <div class="section-home font-roblox">

        <div
            class="top"
        >
            <div class="title-box">
                <h1 class="web-title title">
                    HEXDOGE
                </h1>
            </div>
            <div class="sub-title-box">
                <p class="sub-title">
                    TO THE MOON AND EARN
                </p>
            </div>
        </div>
        <div class="content">
            <div class="hex-box">
                <img class="flight" v-bind:src="require('@/assets/images/HEX_01a.png')">
            </div>
        </div>

    </div>
    <!-- <section class="section-content">
        <div class="hex-box">
            <img class="flight" v-bind:src="require('@/assets/images/HEX_01a.png')">
        </div>
        <div id="title-box" class="title-box">
            <h1>The Doge Space</h1>
        </div>
    </section> -->
</template>

<script setup lang="ts">
import { defineAsyncComponent, Component, computed, onMounted } from 'vue';
import { GlobalStore } from '@/store/GlobalStore';

const {
  isMobile,
} = GlobalStore;
onMounted(() => {
  startType('.title-box', 1000, ['shinning', ]);
  startType('.sub-title-box', 2000);
});
function startType(selector: string, delay = 1000, classList: string[] = []) {
  const title = document.querySelector(selector);
  const CHAR_TIME = 50;

  let text: string, index: number;
  start();

  function requestCharAnimation(char: any, value: string) {
    setTimeout(function() {
      char.textContent = value;
      char.classList.add('fade-in');
    }, CHAR_TIME);
  }

  function addChar() {
    const char = document.createElement('span');
    char.classList.add('char');
    classList.forEach(c => char.classList.add(c));

    char.textContent = '▌';
    title?.appendChild(char);
    requestCharAnimation(char, text.substr(index++, 1));
    if (index < text.length) {
      requestChar();
    }
  }

  function requestChar(delay = 0) {
    setTimeout(addChar, CHAR_TIME + delay);
  }

  function start() {
    index = 0;
    text = (title?.textContent && title?.textContent.trim()) || '';
    if (title?.textContent) {
      title.textContent = '';
    }
    requestChar(delay);
  }
}

</script>

<style lang="scss">
.section-home {
  background: url('~@/assets/images/background2.jpg') no-repeat center bottom;
  background-position: 0, 100px;
  min-height: 100vh;
  padding: 2rem;
  // display: flex;
  // flex-direction: column;
  //        align-items: center;
  // justify-content: center;
  height: 100vh;
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 0 0 10px #000;

  .content {
    position: relative;
    z-index: 1;
    .hex-box {
      width: 100%;
      text-align: center;

      img {
        width: 300px;
        filter: drop-shadow(0px 0px 10px rgba(255, 14, 247, 0.8));
        // margin-right: 200px;
      }
    }
  }
  .top {
    position: relative;
    z-index: 1;
    .title-box {
      height: 10rem;
      min-height: 10rem;
      font-size: 9rem;
    }
    .sub-title-box {
      min-height: 1.5rem;
      font-size: 1.5rem;
      padding-left: .5rem;
    }
    .title {
    }
  }

}
.section-content {
  min-height: 75vh;
  .hex-box {
    // height: 400px;
    img {
      margin-top: 30px;
      margin-bottom: 100px;
      max-height: 30vh;
    }
  }

}
  .title-box, .sub-title-box {
    font-weight: normal;
    letter-spacing: 0.5rem;
    .char {
      color: rgb(236, 182, 251);
      transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
      text-shadow: 0 0 4rem rgba(229, 126, 250, 0.826);
    }
    .char.fade-in {
          color: #fffbff;
      transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
      text-shadow: 0 0 8px rgb(255 171 255 / 66%);
    }
  }
</style>
