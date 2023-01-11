import { CategoryObjType } from "../../type/api";
import { SAVE_CATEGORY_LIST } from "../action_types";
import { categoryList_types } from "../reducers/category_reducer";

export const createSaveCategoryListAction = (
  value: Array<CategoryObjType>
): categoryList_types => {
  return {
    type: SAVE_CATEGORY_LIST,
    data: value,
  };
};
