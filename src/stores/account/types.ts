export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const LOAD_CURRENT_LOGIN_USER_REQUEST =
  "LOAD_CURRENT_LOGIN_USER_REQUEST";
export const LOAD_CURRENT_LOGIN_USER_SUCCESS =
  "LOAD_CURRENT_LOGIN_USER_SUCCESS";
export const LOAD_CURRENT_LOGIN_USER_FAILURE =
  "LOAD_CURRENT_LOGIN_USER_FAILURE";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

export interface AuthenticatedUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avartar: string;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

interface Logout {
  type: typeof LOGOUT;
}

export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

export interface LoadCurrentUserRequest {
  type: typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

export interface LoadCurrentUserSuccess {
  type: typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
  payload: {
    user: AuthenticatedUser;
  };
}

export interface LoadCurrentUserFailure {
  type: typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
  payload: {
    error: string;
  };
}

interface RefreshTokenRequest {
  type: typeof REFRESH_TOKEN_REQUEST;
}

interface RefreshTokenSuccess {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
  };
}

interface RefreshTokenFailure {
  type: typeof REFRESH_TOKEN_FAILURE;
  payload: {
    error: string;
  };
}

export type AccountActionTypes =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | Logout
  | LoadCurrentUserRequest
  | LoadCurrentUserSuccess
  | LoadCurrentUserFailure
  | RefreshTokenRequest
  | RefreshTokenSuccess
  | RefreshTokenFailure;
