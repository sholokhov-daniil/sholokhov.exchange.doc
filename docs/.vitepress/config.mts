// docs/.vitepress/config.mts

import {defineVersionedConfig} from './src/verion-switch/config';

// import { defineConfig } from 'vitepress'
// import { generateVersionRewrites, generateVersionSidebars, generateVersionSwitcher } from './data/versions'

export default defineVersionedConfig({
    title: 'sholokhov.exchange',
    description: 'Документация по модулю sholokhov.exchange',
    base: '/sholokhov.exchange.doc/',
    cleanUrls: true,
    // rewrites: generateVersionRewrites(),
    head: [
        [
            'link',
            {rel: 'icon', href: '/favicon.ico'}
        ]
    ],

    versionSwitcher: {
        latestVersion: '2.1.x',
        items: [
            {text: '2.1.x', link: '/versions/2.1.x/'},
            {text: '0.9.0', link: '/versions/0.9.0/'},
        ],
    },

    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/sholokhov-daniil/sholokhov.exchange' }
        ],
        nav: [
            {text: 'Report a bug', link: "https://github.com/sholokhov-daniil/sholokhov.exchange/issues"},
            // generateVersionSwitcher(),
        ],
        // sidebar: generateVersionSidebars(),

        // sidebar: [
            // {
            //     text: 'Начало работы',
            //     items: [
            //         {text: 'Установка', link: '/'},
            //         {text: 'Конфигурация', link: '/guide/config'},
            //         {
            //             text: 'Карта обмена',
            //             link: '/guide/map/',
            //             items: [
            //                 {text: 'Базовое свойство', link: '/guide/map/base'},
            //                 {text: 'Информационный блок', link: '/guide/map/iblock'}
            //             ]
            //         },
            //         {text: 'Создание обмена', link: '/guide/start'}
            //     ]
            // },
            // {
            //     text: 'Источники данных',
            //     items: [
            //         {text: 'Быстрый XML', link: '/source/xml-simple'},
            //         {text: 'Медленный XML', link: '/source/xml-db'},
            //         {text: 'Json', link: '/source/json'},
            //         {text: 'Json файл', link: '/source/json-file'},
            //     ]
            // },
            // {
            //     text: 'Импорт',
            //     items: [
            //         {text: 'Файл', link: '/import/file'},
            //         {
            //             text: "Инфоблок",
            //             items: [
            //                 {text: "Элемент", link: '/import/iblock/element'},
            //                 {text: "Раздел", link: '/import/iblock/section'},
            //                 {
            //                     text: 'Свойства',
            //                     items: [
            //                         {text: 'Значения списка', link: '/import/iblock/property/enum-value'}
            //                     ]
            //                 }
            //             ]
            //         },
            //         {text: "Элемент справочника", link: '/import/hl/element'},
            //         {
            //             text: 'Пользовательские свойства (UF)',
            //             items: [
            //                 {text: 'Значение списка', link: '/import/uf/enum-value'}
            //             ]
            //         }
            //     ]
            // }
        // ]
    }
});