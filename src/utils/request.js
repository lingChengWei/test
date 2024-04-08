import Vue from "vue";
import axios from "axios";
import store from "@/store";
import qs from "qs";
import router from "@/router";

let loadingInstance;

/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, "error");
  store.dispatch("user/resetAccessToken").catch(() => {});
  router.push({ path: "/login" }).catch(() => {});
};
const instance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  // headers: {
  //   'Content-Type': contentType,
  // },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log("config", config);
    config.$vue = Vue.prototype.$app; // 挂载 vue实例到config
    // 设置token
    const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token
    // }
    if (config.url.startsWith("/common")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // 判断是否走第二个代理
    if (config.url.startsWith("/JHDChangeCodeInterface")) {
      console.log("走第二个代理");
      config.baseURL = "/watwise_war"; // 设置为第二个代理地址
    } else {
      config.baseURL = "/api"; // 设置为第一个代理地址
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();
    const { data, config } = response;
    const { code, msg } = data;

    if (code === 200) {
      return data;
    } else if (code == 300) {
      this.$baseMessage(msg, "error");
      router.push({ path: "/login" }).catch(() => {});
    } else {
      return data;
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    console.log("请求error", error.response);
    const { response, msg } = error;

    if (error.response && error.response.data) {
      const { status, data } = response;
      const { code, msg } = data;
      handleCode(code, msg || message);
      return Promise.reject(error);
    }
    //  else {
    //   let { message } = error
    //   if (message === 'Network Error') {
    //     message = '后端接口连接异常'
    //   }
    //   if (message.includes('timeout')) {
    //     message = '后端接口请求超时'
    //   }
    //   if (message.includes('Request failed with status code')) {
    //     const code = message.substr(message.length - 3)
    //     message = `后端接口${code}异常`
    //   }
    //   Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
    //   return Promise.reject(error)
    // }
  }
);

export default instance;
