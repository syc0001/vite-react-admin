import { CategoryObjType } from "../../type/api";
import { SAVE_CATEGORY_LIST } from "../action_types";
import { action_types } from "./action_types";

const initialState: Array<CategoryObjType> = [];

export interface categoryList_types extends action_types {
  data: Array<CategoryObjType>;
}

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
