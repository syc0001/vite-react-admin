/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { CategoryObjType } from "../../type/Category";
import { SAVE_CATEGORY_LIST } from "../action_types";
import { categoryList_types } from "../reducers/category_reducer";

/**
 * @description 保存分类列表
 * @param {Array<CategoryObjType>} categoryList 传入的分类列表
 */
export const createSaveCategoryListAction = (
  categoryList: Array<CategoryObjType>
): categoryList_types => {
  return {
    type: SAVE_CATEGORY_LIST,
    data: categoryList,
  };
};
