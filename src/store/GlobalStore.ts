import { computed, ref } from 'vue';
import { useScreen } from 'vue-screen';
import { defineStore } from '@/store/store';

const useGlobalStore = defineStore('global', () => {
  const isLoading = ref(true);
  const screen = useScreen();
  const screenWidth = computed(() => {
    return screen.width;
  });
  const isMobile = computed(() => {
    return screen.width <= 860;
  });

  const setLoading = (val: boolean) => {
    isLoading.value = val;
  };

  // document.addEventListener('load', () => {
  //   setLoading(false);
  // });
  setTimeout(() => {
    setLoading(false);
  }, 5000);
  return {
    isMobile,
    screenWidth,
    isLoading,
    setLoading,
  };
});
export const GlobalStore = useGlobalStore();
