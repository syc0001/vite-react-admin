import { ProductType } from "../../type/api";
import { SAVE_PROD_LIST } from "../action_types";
import { action_types } from "./action_types";

export interface product_list_types extends action_types {
  data: ProductType[];
}

const initState: ProductType[] = [];

const ProductReducer = (
  preState = initState,
  actions: product_list_types
): ProductType[] => {
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
