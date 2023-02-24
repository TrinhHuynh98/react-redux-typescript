import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { accountReducer } from "./account/reducer";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { setAuthToken } from "../helpers/set-auth-token";
import { usersReducer } from "./users/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

// add redux tool
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
});

// add persisted redux to keep page when refesh page
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
};

const store = configureStore();
const persistedStore = persistStore(store);

let currentState = store.getState() as AppState;

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState() as AppState;
  if (previousState.account.token !== currentState.account.token) {
    const token = currentState.account.token;
    if (token) {
      setAuthToken(token);
    }
  }
});

export { store, persistedStore };
