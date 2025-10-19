<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useData, useRouter, useRoute } from 'vitepress'
import { onBeforeMount } from 'vue'

const { site } = useData()
const { path } = useRoute()
const { go } = useRouter()


onBeforeMount(() => {
  if (!inBrowser) return

  const base = site.value.base;
  const versionConfig = site.value.themeConfig.versionSwitcher;
  const rootFolder = `${base}${versionConfig.latestVersion}/`;

  if (path === base || path === `${base}/index.html`) {
    go(rootFolder);
  }
})
</script>

<template>
  <DefaultTheme.Layout />
</template>