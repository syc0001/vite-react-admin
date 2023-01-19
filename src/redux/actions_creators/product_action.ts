/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { ProductType } from "../../type/Product";
import { SAVE_PROD_LIST } from "../action_types";
import { product_list_types } from "../reducers/product_reducer";

/**
 * @description 保存商品列表
 * @param {Array<ProductType>} productList 商品列表 
 */
export const createSaveProductListAction = (
  productList:Array<ProductType>
): product_list_types => {
  return {
    type: SAVE_PROD_LIST,
    data: productList,
  };
};
