<template>
    <section class="section-combine">
        <h1 class="title">
            combine
        </h1>
        <div class="content">
            <h2>COMMING SOON...</h2>
        </div>
    </section>
</template>

<script setup lang="ts">
import NavSocial from '@/components/NavSocial.vue';
import { i18n } from '@/locales/i18n';

</script>

<style lang="scss">
.section-combine {
    h1.title {
        position: absolute;
    }
      background: url('~@/assets/images/planet_lightning_eclipse_1920x1080.jpg') no-repeat center center;
      .content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
            align-items: center;
            h2 {
                font-size: 3rem;
                color: #fff;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 0;
            }
      }
}
</style>
