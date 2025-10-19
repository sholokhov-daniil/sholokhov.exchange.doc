// docs/.vitepress/src/verion-switch/nav.ts

import fs from "node:fs"
import path from "node:path"

export function generateVersionSwitcher(config: object): object {
    const versions = getVersions(config);

    console.log(versions);

    config.themeConfig.nav.push(versions);
}

function getVersions(config: config): object {
    const dir =  path.resolve(__dirname, '../../../versions');
    const iterator = fs.readdirSync(dir)

    const switcher: object = {
        text: 'Switch Version',
        items: [
            {
                version: config.versionSwitcher.latestVersion,
                text: `${config.versionSwitcher.latestVersion} (latest)`,
                link: `/versions/${config.versionSwitcher.latestVersion}/`
            }
        ]
    }

    for(const version of iterator) {
        const exist = switcher.items.some(i => i.version === version);
        if (exist) {
            continue;
        }

        switcher.items.push({
            version: version,
            text: version,
            link: `/versions/${version}/`
        });
    }

    return switcher;
}