/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";
import { UserDataType } from "../../type/Login";

/**
 * @description 保存用户信息
 * @param {UserDataType} user 用户的信息
 */
export const createSaveUserInfoAction = (user: UserDataType) => {
  /**
   * 在本地存储中加入对应项
   */
  localStorage.setItem("user", JSON.stringify(user.user));
  localStorage.setItem("token", user.token);
  localStorage.setItem("isLogin", "true");
  return {
    type: SAVE_USER_INFO,
    data: user,
  };
};

/**
 * @description 删除用户信息
 */
export const createDeleteUserInfoAction = () => {
  /**
   * 从本地存储中删除所选项
   */
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  return {
    type: DELETE_USER_INFO,
  };
};
