import {
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
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

    default:
      return state;
  }
};

export { usersReducer };
