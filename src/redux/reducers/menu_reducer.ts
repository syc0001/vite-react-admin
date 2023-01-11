import { SAVE_TITLE } from "../action_types";
import { action_types } from "./action_types";

export interface menu_types extends action_types {
  data: string;
}

const MenuState: string = "";

const menuReducer = (preState = MenuState, actions: menu_types): string => {
  const { type, data } = actions;
  let newState: string;
  switch (type) {
    case SAVE_TITLE:
      newState = data;
      return newState;
    default:
      return preState;
  }
};

export default menuReducer;
