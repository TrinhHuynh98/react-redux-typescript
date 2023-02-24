import { Dispatch } from "react";
import { userService } from "../../services";
import {
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UsesrActionTypes,
} from "./type";

export const getUserListPaging = (currentPage: number) => {
  return async (dispatch: Dispatch<UsesrActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });
      const res = await userService.getUsersPaging(currentPage);

      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};
