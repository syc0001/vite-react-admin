import { ProductType } from "../../type/api";
import { SAVE_PROD_LIST } from "../action_types";
import { product_list_types } from "../reducers/product_reducer";

export const createSaveProductListAction = (
  value: ProductType[]
): product_list_types => {
  return {
    type: SAVE_PROD_LIST,
    data: value,
  };
};
