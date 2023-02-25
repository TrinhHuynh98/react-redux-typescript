import axios from "axios";
import env from "react-dotenv";
import { history } from "./history";
import { AppState, store } from "../stores";
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "../stores/account/types";

const api = axios.create({
  baseURL: `${env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    const currentState = store.getState() as AppState;
    const refreshToken = currentState.account.refreshToken;

    if (
      err.response.status === 401 &&
      originalRequest.url === `${env.API_URL}/api/v1/auth/refresh-token/`
    ) {
      history.push("/login");
      return Promise.reject(err);
    }

    if (
      err.response.data.message === "Token is expired" &&
      err.response.status === 401 &&
      err.response.statusText === "Unauthorized"
    ) {
      if (refreshToken) {
        console.log("RefreshToken new token", refreshToken);
        store.dispatch({
          type: REFRESH_TOKEN_REQUEST,
        });
        return api
          .post("/v1/auth/refresh-token", {
            refreshToken: refreshToken,
          })
          .then((response) => {
            store.dispatch({
              type: REFRESH_TOKEN_SUCCESS,
              payload: {
                token: response.data.token,
                refreshToken: response.data.refreshToken,
              },
            });
            api.defaults.headers.common["x-auth-token"] = response.data.token;
            originalRequest.headers["x-auth-token"] = response.data.token;
            return api(originalRequest);
          })
          .catch((err) => {
            store.dispatch({
              type: REFRESH_TOKEN_FAILURE,
              payload: {
                error: err.toString(),
              },
            });
          });
      } else {
        console.log("RefreshToken not available");
        history.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export { api };
