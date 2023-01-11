import { SAVE_USER_INFO, DELETE_USER_INFO } from "../action_types";
import { LoginStateType } from "../reducers/login_reducer";

export const createSaveUserInfoAction = (value: LoginStateType) => {
  localStorage.setItem("user", JSON.stringify(value.user));
  localStorage.setItem("token", value.token);
  localStorage.setItem("isLogin", "true");
  return {
    type: SAVE_USER_INFO,
    data: value,
  };
};

export const createDeleteUserInfoAction = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  return {
    type: DELETE_USER_INFO,
  };
};