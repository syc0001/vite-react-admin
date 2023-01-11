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

//请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start();
  const { token } = store.getState().userInfo;
  if (token) {
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

//响应拦截器
instance.interceptors.response.use(
  (config: AxiosResponse) => {
    NProgress.done();
    return config.data;
  },
  (error: AxiosError) => {
    NProgress.done();
    if (error.response?.status === 401) {
      message.error("身份校验失败,请重新登录", 1);
      store.dispatch(createDeleteUserInfoAction());
    } else {
      message.error(error.message);
    }
    return new Promise((resolve, reject) => {});
  }
);

export default instance;
