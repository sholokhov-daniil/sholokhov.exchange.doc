// docs/.vitepress/config.mts

import { defineConfig } from 'vitepress'
import { generateVersionRewrites, generateVersionSidebars, generateVersionSwitcher } from './data/versions'

export default defineConfig({
    title: 'sholokhov.exchange',
    description: 'Документация по модулю sholokhov.exchange',
    base: '/sholokhov.exchange.doc/',
    cleanUrls: true,
    rewrites: generateVersionRewrites(),
    head: [
        [
            'link',
            {rel: 'icon', href: '/favicon.ico'}
        ]
    ],

    themeConfig: {
        versionSwitcher: {
            latestVersion: '2.1.x',
            folder: 'v',
            items: [
                {text: '2.1.x', link: '/versions/2.1.x/'},
                {text: '0.9.0', link: '/versions/0.9.0/'},
            ],
        },

        themeConfig: {
            versionSwitcher: true,
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/sholokhov-daniil/sholokhov.exchange' }
        ],
        nav: [
            {text: 'Report a bug', link: "https://github.com/sholokhov-daniil/sholokhov.exchange/issues"},
            generateVersionSwitcher(),
        ],
        sidebar: generateVersionSidebars(),
    }
});