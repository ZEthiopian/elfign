// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ensure devServer exists
  config.devServer = config.devServer || {};

  // Proxy API requests to local backend during web development
  config.devServer.proxy = {
    '/elfign-backend/api': {
      target: 'http://localhost:5000', // Local Express backend
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      pathRewrite: { '^/elfign-backend/api': '/elfign-backend/api' },
    },
  };

  return config;
};
