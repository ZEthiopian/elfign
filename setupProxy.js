const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/elfign-backend',
    createProxyMiddleware({
      target: 'https://derensra.com',
      changeOrigin: true,
      secure: false, // ignore SSL for dev
    })
  );
};
