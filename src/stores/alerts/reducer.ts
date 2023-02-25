import {
  AlertActionTypes,
  AlertState,
  ALERT_CLEAR,
  ALERT_FAILURE,
  ALERT_SUCCESS,
} from "./type";

const initialState: AlertState = {
  type: null,
  message: null,
};
const alertReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return { type: "alert-success", message: action.payload.message };

    case ALERT_FAILURE:
      return { type: "alert-danger", message: action.payload.message };

    case ALERT_CLEAR:
      return { type: null, message: null };

    default:
      return state;
  }
};

export { alertReducer };
