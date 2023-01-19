/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { BaseType } from "./index";

/**
 * @description 分类类型
 */
export interface CategoryObjType {
  parentId: string;
  _id: string;
  name: string;
  __v: number;
}

/**
 * @description 新分类列表
 */
export interface NewCategoryObjType {
  categoryId: string;
  categoryName: string;
}

/**
 * @description 分类列表
 */
export interface CategoryListType extends BaseType {
  data: Array<CategoryObjType>;
}

/**
 * @description 添加分类列表
 */
export interface AddCategoryType extends BaseType {
  data: CategoryObjType;
}

/**
 * @description 更新分类列表
 */
export interface UpdateCategoryType {
  status: number;
  msg: string;
}