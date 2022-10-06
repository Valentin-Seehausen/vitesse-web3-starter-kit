import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
declare let window: any

export const useWalletStore = defineStore('wallet', () => {
  const isConnected = ref(false)
  const isMetaMaskInstalled = ref(false)
  const signer = ref<ethers.providers.JsonRpcSigner>()
  const chainId = ref()
  const account = ref('')

  const chainParams = {
    chainId: import.meta.env.VITE_CHAIN_ID,
    chainName: import.meta.env.VITE_CHAIN_NAME,
    nativeCurrency: { name: import.meta.env.VITE_CURRENCY_NAME, symbol: import.meta.env.VITE_CURRENCY_SYMBOL, decimals: import.meta.env.VITE_CURRENCY_SYMBOL },
    rpcUrls: [import.meta.env.VITE_RPC_URL],
    blockExplorerUrls: [import.meta.env.VITE_BLOCK_EXPLORER],
  }

  const checkMetaMask = async () => {
    // On server side, window is not defined
    if (typeof window == 'undefined')
      return
    isMetaMaskInstalled.value = Boolean(window && window.ethereum && window.ethereum.isMetaMask)
  }

  const changeNetworkNFT = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainParams.chainId }],
      })
    }
    catch (e: any) {
      if (e.code === 4001)
        return // User rejected the request
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams],
      })
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    }
  }

  const changeNetworkProtocol = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xA869' }],
      })
    }
    catch (e: any) {
      if (e.code === 4001)
        return // User rejected the request
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xA869', // 43113
          chainName: 'AVAX Testnet',
          nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
          rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://testnet.explorer.avax.network/'],
        }],
      })
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xA869' }],
      })
    }
  }

  const checkConnection = async () => {
    if (typeof window == 'undefined')
      return
    const _accounts = await window.ethereum.request({
      method: 'eth_accounts',
    })
    if (_accounts.length > 0) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum)
      const _signer = _provider.getSigner()
      signer.value = _signer
      chainId.value = await _signer.getChainId()
      isConnected.value = true
      account.value = _accounts[0]
    }
  }

  const setWalletListeners = () => {
    if (typeof window == 'undefined')
      return
    // Reload on account and network change
    window.ethereum.on('accountsChanged', () => {
      window.location.reload()
    })
    new ethers.providers.Web3Provider(window.ethereum, 'any')
      .on('network', (_newNetwork, oldNetwork) => {
        if (oldNetwork)
          window.location.reload()
      })
  }

  const getSigner = () => {
    if (!isConnected.value)
      throw new Error('Wallet not connected')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider.getSigner()
  }

  const requestConnection = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    checkConnection()
  }

  const accountName = computed(() =>
    `${account.value.substring(0, 5)}...${account.value.substring(account.value.length - 4)}`,
  )

  async function initWallet() {
    if (typeof window == 'undefined')
      return
    try {
      setWalletListeners()

      await checkMetaMask()
      await checkConnection()
    }
    catch (e) {

    }
  }

  return {
    isConnected,
    isMetaMaskInstalled,
    chainId,
    signer,
    account,
    accountName,
    changeNetworkNFT,
    changeNetworkProtocol,
    requestConnection,
    initWallet,
    getSigner,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
