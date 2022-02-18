<template>
    <svg class="svgIcon">
        <use v-bind:xlink:href="`#${iconName}`" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.svgIcon {
    // @include size(1em);

    margin: 0 0.8rem;
}
</style>
