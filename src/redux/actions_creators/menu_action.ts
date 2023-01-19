/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { SAVE_TITLE } from "../action_types";
import { menu_types } from "../reducers/menu_reducer";

/**
 * @description 保存标题
 * @param {string} title 标题
 */
export const createSaveTitleAction = (title: string): menu_types => {
  return {
    type: SAVE_TITLE,
    data: title,
  };
};
