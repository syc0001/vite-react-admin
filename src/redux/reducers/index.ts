/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

import { combineReducers } from "redux";
import categoryListReducer from "./category_reducer";
import loginReducer from "./login_reducer";
import menuReducer from "./menu_reducer";
import ProductReducer from "./product_reducer";

/**
 * 汇总的总类型
 */
const reducers = {
  userInfo: loginReducer,
  title: menuReducer,
  productList: ProductReducer,
  categoryList: categoryListReducer,
};

/**
 * reducers的类型
 */
export type reducersType = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};

const reducer = combineReducers<reducersType>(reducers);

export default reducer;
