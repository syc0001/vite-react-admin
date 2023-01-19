/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";

/**
 * 最核心的管理者
 */
const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
