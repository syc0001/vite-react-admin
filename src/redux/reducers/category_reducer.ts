/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { CategoryObjType } from "../../type/Category";
import { SAVE_CATEGORY_LIST } from "../action_types";
import { action_types } from "./action_types";

/**
 * 分类列表类型
*/
export interface categoryList_types extends action_types {
  data: Array<CategoryObjType>;
}

const initialState: Array<CategoryObjType> = [];

/**
 * @description 管理分类列表的reducer
 * @param {Array<CategoryObjType>} preState 前一个状态
 * @param {categoryList_types} actions 动作
 * @returns {Array<CategoryObjType>}
 */
const categoryListReducer = (
  preState = initialState,
  actions: categoryList_types
): Array<CategoryObjType> => {
  const { type, data } = actions;

  switch (type) {
    case SAVE_CATEGORY_LIST:
      return data;
    default:
      return preState;
  }
};
export default categoryListReducer;
