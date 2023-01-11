import myAxios from "./myAxios";
import {BASE_URL, A_MAP_KEY, CITY_CODE} from "../config";
import jsonp from "jsonp";
import {message} from "antd";

//登录请求
export const reqLogin = (username: string, password: string) => {
  return myAxios.post(`${BASE_URL}/login`, {username, password});
};

//获取商品列表请求
export const reqCategoryList = () => {
  return myAxios.get(`${BASE_URL}/manage/category/list`);
};

//获取天气信息
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${A_MAP_KEY}&city=${CITY_CODE}&output=JSON&extensions=base`,
      {},
      (err, data) => {
        if (err) {
          message.error("请求天气接口失败,请联系管理员");
          return new Promise(() => {
          });
        }
        const {weather, temperature} = data.lives[0];
        resolve({weather, temperature});
      }
    );
  });
};

export const reqAddCategory = (categoryName: string) => {
  return myAxios.post(`${BASE_URL}/manage/category/add`, {categoryName});
};

export const reqUpdateCategory = (categoryObj: {}) => {
  return myAxios.post(`${BASE_URL}/manage/category/update`, categoryObj);
};

export const reqProductList = (pageNum: number, pageSize: number) => {
  return myAxios.get(`${BASE_URL}/manage/product/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });
};

export const reqUpdateProductList = (productId: string, status: number) => {
  return myAxios.post(`${BASE_URL}/manage/product/updateStatus`, {
    productId,
    status,
  });
};

export const reqSearchProductList = (
  pageNum: number,
  pageSize: number,
  searchType: any,
  searchKey: any
) => {
  return myAxios.get(`${BASE_URL}/manage/product/search`, {
    params: {
      pageNum,
      pageSize,
      [searchType]: searchKey,
    },
  });
};

export const reqProdById = (productId: string) => {
  return myAxios.get(`${BASE_URL}/manage/product/info`, {
    params: {
      productId,
    },
  });
};

export const reqDeletePhoto = (name: string) => {
  return myAxios.post(`${BASE_URL}/manage/img/delete`, {
    name,
  });
};
