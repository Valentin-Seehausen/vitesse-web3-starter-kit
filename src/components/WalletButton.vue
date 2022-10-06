<script setup lang="ts">
import { useWalletStore } from '~/store/wallet'

const wallet = useWalletStore()

const onClick = () => {
  if (!wallet.isMetaMaskInstalled)
    return
  if (!wallet.isConnected) {
    wallet.requestConnection()
  }
  else {
    // disconnect
  }
}
</script>

<template>
  <button class="md:w-48 overflow-hidden btn" @click="onClick">
    <p v-if="!wallet.isMetaMaskInstalled">
      Please Install Metamask
    </p>
    <p v-else-if="!wallet.isConnected">
      Connect Wallet
    </p>
    <p v-else class="truncate overflow-hidden">
      {{ wallet.accountName }}
    </p>
  </button>
</template>
