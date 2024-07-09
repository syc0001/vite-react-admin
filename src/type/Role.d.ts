/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { BaseType } from "./index";

/**
 * @description 角色类型
 */
export interface RoleType {
  menus: Array<string>;
  _id: string;
  name: string;
  create_time: number;
  __v: number;
  auth_time?: number;
  auth_name?: string;
}

/**
 * @description 角色列表类型
 */
export interface RoleListType {
  list: Array<RoleType>;
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
}

/**
 * @description 获取角色列表返回类型
 */
export interface RoleReturnType extends BaseType {
  data: RoleListType;
}

/**
 * @description 添加角色返回类型
 */
export interface AddRoleReturnType extends BaseType {
  data: RoleType;
}

/**
 * @description 更新角色类型
 */
export interface AuthRoleType {
  _id: string;
  menus: Array<string>;
  auth_time: number;
  auth_name: string;
}

/**
 * @description 更新角色返回类型
 */
export interface AuthRoleReturnType extends BaseType {
  data: RoleType;
}

export interface DeleteRoleReturnType {
  status: number;
  msg: string;
}
