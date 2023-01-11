// //最核心的管理者
import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
