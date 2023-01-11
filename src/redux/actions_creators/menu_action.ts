import { SAVE_TITLE } from "../action_types";
import { menu_types } from "../reducers/menu_reducer";

export const createSaveTitleAction = (value: string): menu_types => {
  return {
    type: SAVE_TITLE,
    data: value,
  };
};
