import { BigNumber } from 'ethers';
import { computed, ref, watch, reactive } from 'vue';
import { Web3Store } from '../store/Web3Store';
export const MAX_GENESIS_HEX = 36;

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

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

  // CombineDuration: number;
  // CombineSuccessRate: number;
  // CombineEnergyEarn: number;
  // CombineDate: Date | null,
  //

};

export function numberToDate(dateNumber: number): Date {
  const date = new Date(dateNumber * 1000);
  return date;
}

function useHex() {
  const { HexDogeContract, connectWallet, etherProvider, account, } = Web3Store;
  connectWallet();
  const NftMetadata = reactive<{[key: number]: [
    'liveness' | 'duplicating' | 'broken' | 'dupicate_done',
    BigNumber, BigNumber, BigNumber, BigNumber, BigNumber,
  ]}>({});
  const getMetadata = async(tokenId: number) => {
    const result: any = await HexDogeContract.value?.getHexMetadata(tokenId.toString());
    console.log('metadata', result);
    NftMetadata[tokenId] = result;
  };
  const ownerList = ref(new Array(MAX_GENESIS_HEX).fill(''));
  const state = reactive({
    CURRENT_GENESIS_ID: 0,
    CURRENT_NORMAL_ID: 0,
    ENERGY_TOKENS: 0,
    NORMAL_TOKENS: 0,
  });

  const getNormals = async() => {
    let cnt = 0;
    if (HexDogeContract.value) {
      const id = (await HexDogeContract.value?.CURRENT_NORMAL_ID()) as any;
      for (let tokenId = 1000; tokenId <= id; tokenId++) {
        const addr: any = await HexDogeContract.value.token2ownerMap(tokenId.toString());
        if (addr === account.value) {
          cnt++;
        }
      }
    }
    state.NORMAL_TOKENS = cnt;
    return cnt;
  };
  const refresh = async() => {
    if (HexDogeContract.value) {
      console.log('GO');

      const id = (await HexDogeContract.value.CURRENT_GENESIS_ID()) as any;
      state.CURRENT_GENESIS_ID = id;

      const arr: string[] = [];
      for (let tokenId = 0; tokenId <= id; tokenId++) {
        const addr: any = await HexDogeContract.value.token2ownerMap(tokenId.toString());
        arr[tokenId] = addr;
        if (addr === account.value) {
          getMetadata(tokenId);
        }
      }
      ownerList.value = arr;

      const energy = (await HexDogeContract.value.balanceOf(account.value, '9999')) as any;
      state.ENERGY_TOKENS = energy.toNumber();
      console.log('id', energy.toNumber(), ownerList);
      getNormals();
      // state.CURRENT_GENESIS_ID = parseInt(await HexDogeContract.value.CURRENT_GENESIS_ID().call());
    }
  };

  watch(HexDogeContract, async() => {
    console.log('?', HexDogeContract.value);
    refresh();
  }, {
    immediate: true,
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
  // currentNft.value = myNfts.value[0];
  const isLiveness = computed(() => currentNft.value?.status === 'liveness');

  const isDuplicating = computed(() => currentNft.value?.status === 'duplicating');
  const isDuplicatingDone = computed(() => currentNft.value?.status === 'dupicate_done');
  const isBroken = computed(() => currentNft.value?.status === 'broken');
  //   const isDuplicatingDone = computed(() => currentNft.value?.status === 'dupicate_done');
  const myNftsList = computed(() => {
    const list: HexNftType[] = [];
    for (let tokenId = 0; tokenId < ownerList.value.length; tokenId++) {
      const addr = ownerList.value[tokenId];
      if (addr === account.value) {
        const metadata = NftMetadata[tokenId];
        if (metadata) {
          const date = new Date(0);
          date.setUTCSeconds(metadata[4].toNumber());
          list.push({
            id: tokenId,
            type: 'genesis',
            image: require(`@/assets/images/hex/${Math.round(Math.random() * 6) + 1}.png`),
            status: metadata[0],
            // DuplicateDuration: (Math.round(Math.random() * 10) + 5),
            DuplicateDuration: metadata[1].toNumber(),
            DuplicateSuccessRate: metadata[2].toNumber(),
            DuplicateEnergyEarn: metadata[3].toNumber(),
            DuplicateDoneDate: date,
            FixingEnergyCost: metadata[5].toNumber(),
          });
        } else {
          list.push({
            id: tokenId,
            type: 'genesis',
            image: require(`@/assets/images/hex/${Math.round(Math.random() * 6) + 1}.png`),
            status: getRandomFromArray(statusList),
            DuplicateDuration: (Math.round(Math.random() * 10) + 5),
            DuplicateSuccessRate: (Math.round(Math.random() * 100) + 1),
            DuplicateEnergyEarn: (Math.round(Math.random() * 10000) + 1000),
            FixingEnergyCost: (Math.round(Math.random() * 10000) + 1000),
            DuplicateDoneDate: null,
          });
        }
      }
    }
    console.log('list', list);
    return list;
  });

  return {
    state,
    myNfts: myNftsList,
    // myNftsList,
    currentNft,
    isLiveness,
    isDuplicating,
    isDuplicatingDone,
    isBroken,
    refresh,
  };
}

export const HexStore = useHex();

function getRandomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
