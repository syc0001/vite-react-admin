/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { BASE_URL, A_MAP_KEY, CITY_CODE } from "../config";
import jsonp from "jsonp";
import { message } from "antd";
import myAxios from "./myAxios";
import { AddOrUpdateProductType } from "../type/Product";
import { UpdateRoleType } from "../type/Role";
import { AddUserFormType } from "../type/User";
import { WeatherType } from "../type";

/**
 * @description 登录请求
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const reqLogin = (username: string, password: string) => {
  return myAxios.post(`${BASE_URL}/login`, { username, password });
};

/**
 * @description 获取商品列表请求
 */
export const reqCategoryList = () => {
  return myAxios.get(`${BASE_URL}/manage/category/list`);
};

/**
 * @description 获取天气信息
 */
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${A_MAP_KEY}&city=${CITY_CODE}&output=JSON&extensions=base`,
      {},
      (err, data) => {
        if (err) {
          message.error("请求天气接口失败,请联系管理员");
          return new Promise(() => {});
        }
        const { weather, temperature } = data.lives[0];
        resolve({ weather, temperature } as WeatherType);
      }
    );
  });
};

/**
 * @description 添加商品类型
 * @param {string} categoryName 商品名称
 */
export const reqAddCategory = (categoryName: string) => {
  return myAxios.post(`${BASE_URL}/manage/category/add`, { categoryName });
};

/**
 * @description 更新商品类型
 * @param {Object} categoryObj 商品类型对象
 */
export const reqUpdateCategory = (categoryObj: {}) => {
  return myAxios.post(`${BASE_URL}/manage/category/update`, categoryObj);
};

/**
 * @description 请求商品列表
 * @param {number} pageNum 页数
 * @param {number} pageSize 一页几项
 */
export const reqProductList = (pageNum: number, pageSize: number) => {
  return myAxios.get(`${BASE_URL}/manage/product/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });
};

/**
 * @description 更新商品列表
 * @param {number} productId 商品id
 * @param {number} status 状态
 */
export const reqUpdateProductList = (productId: string, status: number) => {
  return myAxios.post(`${BASE_URL}/manage/product/updateStatus`, {
    productId,
    status,
  });
};

/**
 * @description 查询商品列表
 * @param {string} pageNum 页数
 * @param {string} pageSize 一页几项
 * @param {any} searchType 查找类型
 * @param {any} searchKey 查找键
 */
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

/**
 * @description 根据id得到商品
 * @param {string} productId 商品id
 */
export const reqProdById = (productId: string) => {
  return myAxios.get(`${BASE_URL}/manage/product/info`, {
    params: {
      productId,
    },
  });
};

/**
 * @description 删除照片
 * @param {string} name 照片名称
 */
export const reqDeletePhoto = (name: string) => {
  return myAxios.post(`${BASE_URL}/manage/img/delete`, {
    name,
  });
};

/**
 * @description 添加商品
 * @param {AddOrUpdateProductType} productObj 添加的商品对象
 */
export const reqAddProduct = (productObj: AddOrUpdateProductType) => {
  return myAxios.post(`${BASE_URL}/manage/product/add`, productObj);
};

/**
 * @description 更新商品
 * @param {AddOrUpdateProductType} productObj 更新的商品对象
 */
export const reqUpdateProduct = (productObj: AddOrUpdateProductType) => {
  console.log("reqUpdateProduct:", productObj);
  return myAxios.post(`${BASE_URL}/manage/product/update`, productObj);
};

/**
 * @description 获取角色列表
 * @param {number} pageNum 页数
 * @param {number} pageSize 一页几项
 */
export const reqRoleList = (pageNum: number, pageSize: number) => {
  return myAxios.get(`${BASE_URL}/manage/role/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });
};

/**
 * @description 添加角色
 * @param {string} roleName 角色名字
 */
export const reqAddRole = (roleName: string) => {
  return myAxios.post(`${BASE_URL}/manage/role/add`, {
    roleName,
  });
};

/**
 * @description 更新角色
 * @param {UpdateRoleType} roleObj 更新角色对象
 */
export const reqAuthRole = (roleObj: UpdateRoleType) => {
  return myAxios.post(`${BASE_URL}/manage/role/update`, {
    ...roleObj,
  });
};

/**
 * @description 获取用户列表(同时携带着角色列表)
 */
export const reqUserList = () => {
  return myAxios.get(`${BASE_URL}/manage/user/list`);
};

/**
 * @description 请求添加用户
 * @param {AddUserFormType} userObj 用户对象
 */
export const reqAddUser = (userObj: AddUserFormType) => {
  return myAxios.post(`${BASE_URL}/manage/user/add`, userObj);
};
