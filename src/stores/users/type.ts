import { IPagination } from "../../helpers";

export const LOAD_USERS_PAGING_REQUEST = "LOAD_USERS_PAGING_REQUEST";
export const LOAD_USERS_PAGING_SUCCESS = "LOAD_USERS_PAGING_SUCCESS";
export const LOAD_USERS_PAGING_FAILURE = "LOAD_USERS_PAGING_FAILURE";

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avartar: string;
}

interface LoadUsersPagingRequest {
  type: typeof LOAD_USERS_PAGING_REQUEST;
}

interface LoadUsersPagingSuccess {
  type: typeof LOAD_USERS_PAGING_SUCCESS;
  payload: IPagination<IUser>;
}

interface LoadUsersPagingFailure {
  type: typeof LOAD_USERS_PAGING_FAILURE;
  payload: {
    error: string;
  };
}

export interface UsersState {
  items: IUser[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  deleteCount: number;
  error: string | null;
}

export type UsesrActionTypes =
  | LoadUsersPagingRequest
  | LoadUsersPagingSuccess
  | LoadUsersPagingFailure;
