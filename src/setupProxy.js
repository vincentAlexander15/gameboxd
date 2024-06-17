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
            headers: {
                'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.REACT_APP_TWITCH_CLIENT_SECRET}`,
            },
        })
    );
};
