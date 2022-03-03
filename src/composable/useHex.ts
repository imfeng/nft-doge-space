import { computed, ref, watch } from 'vue';
import { Web3Store } from '../store/Web3Store';

export type HexNftType = {
  id: number;
  type: 'genesis' | 'normal' | 'energy' | 'normal_l2' | 'normal_l3';
  image: string; // (?) id => image
  //
  status: 'liveness' | 'duplicating' | 'broken' | 'dupicate_done';
  //
  DuplicateDuration: number;
  DuplicateSuccessRate: number;
  DuplicateEnergyEarn: number;
  DuplicateDoneDate: Date | null,
  // if now > DuplicateDoneDate then `do claim` -> 'liveness' | 'broken'

  FixingEnergyCost: number;
  // `do fixing` -> 'liveness'

  CombineDuration: number;
  CombineSuccessRate: number;
  CombineEnergyEarn: number;
  CombineDate: Date | null,
  //

};

export function numberToDate(dateNumber: number): Date {
  const date = new Date(dateNumber * 1000);
  return date;
}

function useHex() {
  const { HexDogeContract, } = Web3Store;
  watch(HexDogeContract, () => {

  });
  const statusList: string[] = ['liveness', 'dupicate_done', 'broken', ];

  const myNfts = ref<HexNftType[]>([]);
  const currentNft = ref<HexNftType | null>(null);
  myNfts.value = new Array(6).fill(0).map((_, i) => ({
    id: Math.round(Math.random() * 1000) + 1,
    image: require(`@/assets/images/hex/${Math.round(Math.random() * 6) + 1}.png`),
    status: getRandomFromArray(statusList),
    DuplicateDuration: (Math.round(Math.random() * 10) + 5),
    DuplicateSuccessRate: (Math.round(Math.random() * 100) + 1),
    DuplicateEnergyEarn: (Math.round(Math.random() * 10000) + 1000),
    FixingEnergyCost: (Math.round(Math.random() * 10000) + 1000),
    DuplicateDoneDate: null,
  }) as unknown as HexNftType);
  currentNft.value = myNfts.value[0];

  const isDuplicating = computed(() => currentNft.value?.status === 'duplicating');
  const isDuplicatingDone = computed(() => currentNft.value?.status === 'dupicate_done');
  const isBroken = computed(() => currentNft.value?.status === 'broken');
  //   const isDuplicatingDone = computed(() => currentNft.value?.status === 'dupicate_done');

  return {
    myNfts,
    currentNft,
    isDuplicating,
    isDuplicatingDone,
    isBroken,
  };
}

export const HexStore = useHex();

function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
