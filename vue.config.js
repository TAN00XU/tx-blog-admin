const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    //打包优化
    productionSourceMap: false,

    transpileDependencies: true,

    //配置代理
    devServer: {
        // 外部浏览器可访问
        // disableHostCheck: true,
        // historyApiFallback: true,
        allowedHosts: "all",
        proxy: {
            "/api": {
                target: "http://localhost:8888",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    chainWebpack: config => {
        // @ 的作用是在你引入模块时，可以使用 @ 代替 /src 目录，避免易错的相对路径。
        config.resolve.alias.set("@", resolve("src"));
    }
})
// 引入path模块
const path = require("path");

// 封装path绝对路径拼接的函数resolve ,方便直接引入函数拼接使用
function resolve(dir) {
    return path.join(__dirname, dir);
}
