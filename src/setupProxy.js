const { createProxyMiddleware: proxy } = require("http-proxy-middleware")
module.exports = app => {
    app.use(
        proxy("/api", {
            target: "https://api.it120.cc", // 被代理的域名地址
            changeOrigin: true, // 开启反向代理
            pathRewrite: { // 重定向
                "^/api": ""
            }
        }),
        proxy("/bpi", {
            target: "https://xxxx", // 被代理的域名地址
            changeOrigin: true, // 开启反向代理
            pathRewrite: { // 重定向
                "^/bpi": ""
            }
        }),
    )
}