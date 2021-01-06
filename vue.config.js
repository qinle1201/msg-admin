module.exports = {
    publicPath:'./',
    devServer: {
        port: 9977,
        open: true,
        host: 'localhost',
        https: false,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    // 是否开启ESlint语法
    lintOnSave: false,
    // 打包时不会生成.map文件， 加快打包速度
    productionSourceMap: false
}