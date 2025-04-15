const builder = require("electron-builder")
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

process.env.ELECTRON_MIRROR = 'https://npmmirror.com/mirrors/electron/';
process.env.ELECTRON_CACHE = path.resolve(__dirname, '../.electron-cache');
process.env.ELECTRON_BUILDER_CACHE = path.resolve(__dirname, '../.electron-cache');


const Platform = builder.Platform;

const args = process.argv.slice(2);

let targets;

if (args.includes('--mac')) {
  targets = Platform.MAC.createTarget();
} else if (args.includes('--win')) {
  targets = Platform.WINDOWS.createTarget();
} else if (args.includes('--all')) {
  targets = Platform.MAC.createTarget()
    .merge(Platform.WINDOWS.createTarget())
    .merge(Platform.LINUX.createTarget());
} else {
  targets = undefined;
}

const configPath = path.resolve(__dirname, '../electron-builder.yml');
let config = {};

try {
  const fileContent = fs.readFileSync(configPath, 'utf8');
  config = yaml.load(fileContent);
} catch (error) {
  console.error('❌ Failed to read electron-builder.yml:', error);
  process.exit(1);
}

builder.build({
  config,
  targets,
}).then(() => {
  console.log('✅ Build completed successfully.');
}).catch((error) => {
  console.error('❌ Build failed:', error);
});
