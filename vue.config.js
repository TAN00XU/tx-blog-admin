const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    //打包优化
    productionSourceMap: false,

    transpileDependencies: true
})
