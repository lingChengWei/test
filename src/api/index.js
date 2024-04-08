import request from "@/utils/request";

// 获取商品信息
export const getGoods = (data) => {
  return request({
    url: "/get-info",
    method: "get",
    params: data,
  });
};

// 更新商品信息
export const updataGoods = (data) => {
  return request({
    url: "/bulk_update_info/",
    method: "post",
    data: data,
  });
};

// 推送商品信息
export const pushGoods = (data) => {
  return request({
    url: "/bulk_query_info/",
    method: "post",
    data: data,
  });
};

// a页面推送商品信息
export const aPushGoods = (data) => {
  return request({
    url: "/a_push",
    method: "post",
    data: data,
  });
};
// 获取b页面数据
export const getBGoods = (data) => {
  return request({
    url: "/b_show/",
    method: "post",
    data: data,
  });
};

// b页面推送商品信息
export const bPushGoods = (data) => {
  return request({
    url: "/b_push",
    method: "post",
    data: data,
  });
};

// 获取b页面数据
export const getCGoods = (data) => {
  return request({
    url: "/c_show/",
    method: "get",
    params: data,
  });
};

// 爬虫接口
// 获取抖音商品信息
export const getDyrsGoods = (data) => {
  return request({
    url: "/api/dyrs/",
    method: "post",
    data: data,
  });
};
// 获取直播商品信息
export const getZbrxGoods = (data) => {
  return request({
    url: "/api/zbrx/",
    method: "post",
    data: data,
  });
};
// 获取热销商品信息
export const getSprxGoods = (data) => {
  return request({
    url: "/api/sprx/",
    method: "post",
    data: data,
  });
};
