module.exports = {
    //axios域代理，解决axios跨域问题
    baseUrl: '/',
    devServer: {
        proxy: {
            '': {
                target: 'http://192.168.1.105:8090',
                changeOrigin: true,
                ws: true,
                pathRewrite: {

                }
            }
        }
    }
}