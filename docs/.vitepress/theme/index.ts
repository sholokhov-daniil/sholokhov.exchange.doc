// https://vitepress.dev/guide/custom-theme

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import VersionSwitcher from '../components/VersionSwitcher.vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({app, router, siteData}) {
    app.component('VersionSwitcher', VersionSwitcher)
  }
} satisfies Theme
