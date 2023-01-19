/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { SAVE_TITLE } from "../action_types";
import { action_types } from "./action_types";

/**
 * 菜单的类型
 */
export interface menu_types extends action_types {
  data: string;
}

const MenuState: string = "";

/**
 * @description 管理菜单的reducer
 * @param {string} preState 前一个状态
 * @param {menu_types} actions 动作
 * @returns {string}
 */
const menuReducer = (preState = MenuState, actions: menu_types): string => {
  const { type, data } = actions;
  let newState: string;
  switch (type) {
    case SAVE_TITLE:
      newState = data;
      return newState;
    default:
      return preState;
  }
};

export default menuReducer;
