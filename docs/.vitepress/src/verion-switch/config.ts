// docs/.vitepress/src/verion-switch/config.ts

import { defineConfig } from 'vitepress'

import {generateVersionSwitcher} from './nav';

export function defineVersionedConfig(config: object): object {
    generateVersionSwitcher(config);

    return defineConfig(config);
}