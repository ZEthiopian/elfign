// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db'); // If you use SQLite

module.exports = defaultConfig;