/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { BaseType } from "./index";
import { RoleType } from "./Role";

/**
 * @description 用户类型
 */
export interface UserType {
  _id: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  role_id: string;
  create_time: number;
  __v: number;
}

/**
 * @description 用户列表和角色
 */
interface UserListAndRoles {
  roles: Array<RoleType>;
  users: Array<UserType>;
}

/**
 * @description 用户列表返回类型
 */
export interface UserListReturnType extends BaseType {
  data: UserListAndRoles;
}

/**
 * @description 添加用户表单取得的类型
 */
export interface AddUserFormType {
  username: string;
  password: string;
  phone: string;
  email: string;
  role_id: string;
}

/**
 * @description 添加用户返回类型
 */
export interface AddUserReturnType extends BaseType {
  data: UserType;
}

/**
 * @description 删除用户返回类型
 */
export interface DeleteUserReturnType {
  status: number;
}

export interface UpdateUserReturnType extends BaseType {
  data: UserType;
}
