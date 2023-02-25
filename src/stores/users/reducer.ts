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
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersState,
  UsesrActionTypes,
} from "./type";

const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deleteCount: 0,
  error: null,
  editUser: null,
};
const usersReducer = (
  state: UsersState = initialState,
  action: UsesrActionTypes
): UsersState => {
  switch (action.type) {
    case LOAD_USERS_PAGING_REQUEST: {
      return { ...state, loading: true };
    }
    case "LOAD_USERS_PAGING_SUCCESS": {
      return {
        ...state,
        items: action.payload.items,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
        loading: false,
        error: null,
      };
    }
    case LOAD_USERS_PAGING_FAILURE: {
      return { ...state, loading: false, error: action.payload.error };
    }
    case ADD_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_USER_FAILURE: {
      return { ...state, loading: false, error: action.payload.error };
    }
    case GET_USER_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        editUser: action.payload.user,
        loading: false,
        error: null,
      };
    }
    case GET_USER_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case DELETE_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case DELETE_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export { usersReducer };
