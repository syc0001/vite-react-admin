import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";
import { action_types } from "./action_types";
import {UserDataType} from "../../type/Login";


interface login_types extends action_types {
  data: UserDataType;
}

let user = JSON.parse(localStorage.getItem("user") as string);
let token = localStorage.getItem("token") as string;

const LoginState: UserDataType = {
  user: user || {},
  token: token,
  isLogin: !!(user && token),
};

const loginReducer = (
  preState = LoginState,
  actions: login_types
): UserDataType => {
  const { type, data } = actions;
  let newState: UserDataType;
  switch (type) {
    case SAVE_USER_INFO:
      newState = { user: data.user, token: data.token, isLogin: true };
      return newState;
    case DELETE_USER_INFO:
      newState = { user: {}, token: "", isLogin: false };
      return newState;
    default:
      return preState;
  }
};

export default loginReducer;
