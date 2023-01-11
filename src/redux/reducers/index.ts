import { combineReducers } from "redux";
import categoryListReducer from "./category_reducer";
import loginReducer from "./login_reducer";
import menuReducer from "./menu_reducer";
import ProductReducer from "./product_reducer";

const reducers = {
  userInfo: loginReducer,
  title: menuReducer,
  productList: ProductReducer,
  categoryList: categoryListReducer,
};

export type reducersType = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};

const reducer = combineReducers<reducersType>(reducers);

export default reducer;
