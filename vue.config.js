const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, // 关闭ESLint
  devServer: {
    host: "0.0.0.0", // 允许任何IP地址访问
    port: 8080, // 你的项目端口号
    proxy: {
      "/api": {
        target: "http://localhost:9007",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/watwise_war": {
        target: "http://in.kwt56.com:8270",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/watwise_war": "",
        },
      },
    },
  },
});
