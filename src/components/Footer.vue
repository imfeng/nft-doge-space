<template>
    <section class="section-footer">
        <div class="bottom-image">
        </div>
        <div class="nav-footer">
            <div class="whitepaper">
            </div>
            <NavSocial></NavSocial>
        </div>
        <div class="copyright">
            <p>{{ i18n.t('COPYRIGHT1') }}</p>
            <p>{{ i18n.t('COPYRIGHT2') }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import NavSocial from '@/components/NavSocial.vue';
import { i18n } from '@/locales/i18n';

</script>

<style lang="scss" scoped>

</style>
