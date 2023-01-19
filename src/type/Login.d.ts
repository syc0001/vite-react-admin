/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { BaseType } from "./index";
import { RoleType } from "./Role";
import { UserType } from "./User";

/**
 * @description 用户数据
 */
export interface UserDataType {
  user: (UserType & { role: RoleType });
  token: string;
  isLogin: boolean;
}

/**
 * @description 登录返回数据
 */
export interface LoginType extends BaseType {
  data: UserDataType;
}
