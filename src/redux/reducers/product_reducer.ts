/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { ProductType } from "../../type/Product";
import { SAVE_PROD_LIST } from "../action_types";
import { action_types } from "./action_types";

/**
 * 管理商品列表的类型
 */
export interface product_list_types extends action_types {
  data: ProductType[];
}

const initState: Array<ProductType> = [];

/**
 * @description 管理商品的reducer
 * @param {Array<ProductType>} preState 前一个状态
 * @param {product_list_types} actions 动作
 * @returns {Array<ProductType>}
 */
const ProductReducer = (
  preState = initState,
  actions: product_list_types
): Array<ProductType> => {
  const { type, data } = actions;
  let newState: ProductType[];
  switch (type) {
    case SAVE_PROD_LIST:
      newState = [...data];
      return newState;
    default:
      return preState;
  }
};

export default ProductReducer;
