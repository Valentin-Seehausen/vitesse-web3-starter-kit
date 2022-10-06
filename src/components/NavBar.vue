<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
import { toggleDark } from '~/composables'
const router = useRouter()

const showMenu = ref(false)
const toggleNav = () => (showMenu.value = !showMenu.value)

router.beforeEach(() => { showMenu.value = false })
</script>

<template>
  <OnClickOutside @trigger="showMenu = false">
    <div class="overflow-visible h-20 z-50 fixed inset-x-0 top-0">
      <nav class="flex items-center justify-between flex-wrap bg-black p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <router-link
            to="/"
            title="TITLE"
            class="font-semibold text-xl tracking-tight"
          >
            TITLE
          </router-link>
        </div>
        <div class="flex lg:hidden">
          <WalletButton />
          <button
            class="flex items-center ml-3 px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            @click="toggleNav"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          class="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:block"
          :class="{ hidden: !showMenu }"
        >
          <div class="lg:flex-grow">
            <router-link
              to="/projects"
              title="Link"
              class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 lg:mr-4"
            >
              Projects
            </router-link>
            <router-link
              to="/about"
              title="Link"
              class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 lg:mr-4"
            >
              About
            </router-link>
            <div class="lg:hidden text-center">
              <button
                class="icon-btn m-4 text-white i-carbon-sun dark:i-carbon-moon"
                title="Toggle dark mode"
                @click="toggleDark()"
              />
              <a href="https://opensea.io/" target="_blank">
                <button class="icon-btn m-4 text-white i-simple-icons-opensea" to="/" />
              </a>
              <a href="https://twitter.com/V_Seehausen/" target="_blank">
                <button class="icon-btn m-4 text-white i-simple-icons-twitter" to="/" />
              </a>
              <a href="https://discord.gg/" target="_blank">
                <button class="icon-btn m-4 text-white i-simple-icons-discord" to="/" />
              </a>
            </div>
          </div>
          <div>
            <div class="hidden !outline-none lg:flex items-center ">
              <button
                class="icon-btn m-2 text-white i-carbon-sun dark:i-carbon-moon"
                title="Toggle dark mode"
                @click="toggleDark()"
              />
              <a href="https://opensea.io/collection/sevendots/" target="_blank">
                <button class="icon-btn m-2 text-white i-simple-icons-opensea" to="/" />
              </a>
              <a href="https://twitter.com/SevenDotsArt/" target="_blank">
                <button class="icon-btn m-2 text-white i-simple-icons-twitter" to="/" />
              </a>
              <a href="https://discord.gg/Wh3wtcq9" target="_blank">
                <button class="icon-btn m-2 mr-4 text-white i-simple-icons-discord" to="/" />
              </a>
              <WalletButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </OnClickOutside>
</template>
