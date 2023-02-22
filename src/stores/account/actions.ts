import {
  LOGIN_REQUEST,
  AccountActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./types";
import { Dispatch } from "react";
import { userService } from "../../services";
import { history } from "../../helpers";

export const login = (email: string, password: string, from: string) => {
  return (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    userService.login(email, password).then(
      (res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res,
        });
        history.push(from);
      },
      (error) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            error: error.toString(),
          },
        });
      }
    );
  };
};

export const logout = (): AccountActionTypes => {
  return { type: LOGOUT };
};
