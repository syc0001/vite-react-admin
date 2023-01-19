/**
 * @description 全局Axios配置
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import NProgress from "nprogress";
import qs from "qs";
import "nprogress/nprogress.css";
import store from "../redux/store";
import { createDeleteUserInfoAction } from "../redux/actions_creators/login_action";

const instance = axios.create({
  timeout: 4000,
});

//添加请求拦截器
instance.interceptors.request.use((config) => {
  // 进度条开始
  NProgress.start();
  const { token } = store.getState().userInfo;
  if (token) {
    // 在请求头部加上 Authorization
    config.headers!.Authorization = token;
  }
  const { method, data } = config;
  if (method?.toLowerCase() === "post") {
    if (data instanceof Object) {
      config.data = qs.stringify(data);
    }
  }
  return config;
});

//添加响应拦截器
instance.interceptors.response.use(
  (config: AxiosResponse) => {
    //进度条关闭
    NProgress.done();
    return config.data;
  },
  (error: AxiosError) => {
    //进度条关闭
    NProgress.done();
    // 验证状态
    if (error.response?.status === 401) {
      message.error("身份校验失败,请重新登录", 1);
      //初发redux,删除用户cookie
      store.dispatch(createDeleteUserInfoAction());
    } else {
      message.error(error.message);
    }
    // 返回pending状态,中断Promise链
    return new Promise(() => {});
  }
);

export default instance;
