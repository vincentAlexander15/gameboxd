const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/igdb',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4',
            changeOrigin: true,
            pathRewrite: {
                '^/igdb': '',  // Remove '/igdb' from the path
            },
        })
    );
};
