/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";
import { action_types } from "./action_types";
import { UserDataType } from "../../type/Login";

/**
 * 登录的类型
 */
interface login_types extends action_types {
  data: UserDataType;
}

/**
 * 本地存储中得到的数据
 */
let user = JSON.parse(localStorage.getItem("user") as string);
let token = localStorage.getItem("token") as string;

const LoginState: UserDataType = {
  user: user || {},
  token: token,
  isLogin: !!(user && token),
};

/**
 * @description 管理登录的reducer
 * @param {UserDataType} preState 前一个状态
 * @param {login_types} actions 动作
 * @returns {UserDataType}
 */
const loginReducer = (
  preState = LoginState,
  actions: login_types
): UserDataType => {
  const { type, data } = actions;
  let newState: UserDataType;
  switch (type) {
    case SAVE_USER_INFO:
      newState = { user: data.user, token: data.token, isLogin: true };
      return newState;
    case DELETE_USER_INFO:
      newState = {
        user: {} as UserDataType["user"],
        token: "",
        isLogin: false,
      };
      return newState;
    default:
      return preState;
  }
};

export default loginReducer;
