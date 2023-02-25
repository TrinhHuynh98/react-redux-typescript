import { Dispatch } from "react";
import { userService } from "../../services";
import { history } from "../../helpers";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUser,
  IUpdateUser,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsesrActionTypes,
} from "./type";
import { routerUrl } from "../../contanst";
import { alertClear, alertFailure, alertSucess } from "../alerts/actions";
import { AlertActionTypes } from "../alerts/type";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const getUserListPaging = (currentPage: number, keyword: string) => {
  return async (dispatch: Dispatch<UsesrActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });
      const res = await userService.getUsersPaging(currentPage, keyword);

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

export const createUser = (user: IAddUser) => {
  return async (dispatch: Dispatch<UsesrActionTypes | AlertActionTypes>) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      await userService.addUser(user);
      dispatch({ type: ADD_USER_SUCCESS });
      history.push(routerUrl.USERS_LIST);
      dispatch(alertSucess("Add user successfully!"));
    } catch (error: any) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertFailure("Add user failed!"));
    }
    setTimeout(() => {
      dispatch(alertClear());
    }, 3000);
  };
};

export const getUserById = (id: string) => {
  return async (dispatch: Dispatch<UsesrActionTypes>) => {
    try {
      dispatch({ type: GET_USER_BY_ID_REQUEST });
      const res = await userService.getUserById(id);
      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: {
          user: res,
        },
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_BY_ID_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};

export const editUser = (id: string, user: IUpdateUser) => {
  return async (dispatch: Dispatch<UsesrActionTypes | AlertActionTypes>) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });

      await userService.editUser(id, user);

      dispatch({ type: UPDATE_USER_SUCCESS });

      history.push(routerUrl.USERS_LIST);
      dispatch(alertSucess("Update user successfully!"));
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertFailure("Update user failed!"));
    }
    setTimeout(() => {
      dispatch(alertClear());
    }, 3000);
  };
};

export const deletetUsers = (ids: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({ type: DELETE_USERS_REQUEST });

      await userService.deleteUser(ids);

      dispatch({ type: DELETE_USERS_SUCCESS });

      history.push(routerUrl.USERS_LIST);
      dispatch(alertSucess("Delete user successfully!"));
      dispatch(getUserListPaging(1, ""));
    } catch (error: any) {
      dispatch({
        type: DELETE_USERS_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertFailure("Delete user failed!"));
    }
    setTimeout(() => {
      dispatch(alertClear());
    }, 3000);
  };
};
