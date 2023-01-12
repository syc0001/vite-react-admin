import {BaseType} from "./index";

/**
 * @description 用户数据
 */
export interface UserDataType {
  user: { [key: string]: any };
  token: string;
  isLogin: boolean;
}

/**
 * @description 登录返回数据
 */
export interface LoginType extends BaseType {
  data: UserDataType;
}