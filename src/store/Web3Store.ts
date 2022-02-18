
import ethers, { Contract } from 'ethers';
import { reactive, ref, watch, computed } from 'vue';
import { ChainId, Metamask, MetaMaskProvider, useBoard, useEthers, useEthersHooks, useWallet } from '@/ethers';
import { i18n } from '@/locales/i18n';
import { defineStore } from '@/store/store';
//
const contractAddress = '';

const useWeb3Store = defineStore('Web3Store', () => {
  const { open, } = useBoard();
  const { status, disconnect, error, provider: walletProvider, walletName, } = useWallet();
  const { address, balance, chainId, isActivated, provider: etherProvider, } = useEthers();
  const { onActivated, onChanged, } = useEthersHooks();
  const ExampleContract = ref<Contract | null>(null);
  const state = reactive({
    name: '',
    maxTotalSupply: 0,
    onlyWhitelisted: true,
    paused: true,
    totalSupply: 0,
  });
  const mintPerPrice = computed(() => {
    return state.onlyWhitelisted ? 0.168 : 0.188;
  });
  watch(etherProvider, async(newVal) => {
    if (etherProvider.value) {
      const signer = etherProvider.value.getSigner();
      // ExampleContract.value = new Contract(contractAddress, contractAbi, signer);

    }
  });
  const supportedChainId = [
    ChainId.Mainnet,
    ChainId.Rinkeby,
    ChainId.Arbitrum,
    ChainId.Rinkarby,
    ChainId.Polygon,
  ];
  const selectedChainId = ref(0);

  onActivated(() => {
    selectedChainId.value = chainId.value as number;
    if (selectedChainId.value !== ChainId.Rinkeby) {
      alert('please change Network to Rinkeby !!!');
    }
  });
  onChanged(() => {
    selectedChainId.value = chainId.value as number;
  });

  watch(selectedChainId, async(val, oldVal) => {
    if (oldVal === 0) return; // ignore initial change
    try {
      walletName.value === 'metamask' &&
      (await Metamask.switchChain(walletProvider.value as MetaMaskProvider, val));
    } catch (e: any) {
      console.error(e);
      selectedChainId.value = oldVal;
    }
  });
  // console.log(open);
  // const injected = new InjectedConnector({
  // // eslint-disable-next-line comma-spacing
  //   supportedChainIds: [1, 137,],
  // });

  // const walletconnect = new WalletConnectConnector({
  //   rpc: { 1: 'https://mainnet.infura.io/v3/YOUR_API_KEY', },
  //   qrcode: true,
  // });

  // setWeb3LibraryCallback(provider => new Web3(provider));
  // const { active, deactivate, activate, account, library, } = useWeb3<Web3>();

  const connectWallet = async() => {
    if (!process.env.ENABLE_WEB3) {
      alert(i18n.t('COMMING_SOON'));
      return;
    }
    if (isActivated.value) {
      const result = confirm('Do you want to disconnect wallet ?');
      if (result) {
        disconnect();
      }
    } else {
      open();
    }
  };

  // const connectUsingWalletConnect = async() => {
  //   await activate(walletconnect);
  // };

  return {
    connectWallet,
    // connectUsingWalletConnect,
    mintPerPrice,
    active: isActivated,
    account: address,
    // library,
  };
});
export const Web3Store = useWeb3Store();
