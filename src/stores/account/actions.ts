import {
  LOGIN_REQUEST,
  AccountActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
} from "./types";
import { Dispatch } from "react";
import { userService } from "../../services";
// import { history } from "../../helpers";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    try {
      const response = await userService.login(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: error.toString(),
        },
      });
    }
  };
};

export const logout = (): AccountActionTypes => {
  return { type: LOGOUT };
};

export const getCurrentUser = () => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOAD_CURRENT_LOGIN_USER_REQUEST,
    });

    try {
      const response = await userService.getCurrentUser();
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
        payload: { user: response },
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};
