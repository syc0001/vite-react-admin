import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";
import { action_types } from "./action_types";

export interface LoginStateType {
  user: { [key: string]: any };
  token: string;
  isLogin: boolean;
}

interface login_types extends action_types {
  data: LoginStateType;
}

let user = JSON.parse(localStorage.getItem("user") as string);
let token = localStorage.getItem("token") as string;

const LoginState: LoginStateType = {
  user: user || {},
  token: token,
  isLogin: !!(user && token),
};

const loginReducer = (
  preState = LoginState,
  actions: login_types
): LoginStateType => {
  const { type, data } = actions;
  let newState: LoginStateType;
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
