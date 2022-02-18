import { computed } from 'vue';
import { useScreen } from 'vue-screen';
import { defineStore } from '@/store/store';

const useGlobalStore = defineStore('global', () => {
  const screen = useScreen();
  const screenWidth = computed(() => {
    return screen.width;
  });
  const isMobile = computed(() => {
    return screen.width <= 860;
  });
  return {
    isMobile,
    screenWidth,
  };
});
export const GlobalStore = useGlobalStore();
