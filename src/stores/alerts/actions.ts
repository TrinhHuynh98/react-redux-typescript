import {
  AlertActionTypes,
  ALERT_CLEAR,
  ALERT_FAILURE,
  ALERT_SUCCESS,
} from "./type";

const alertSucess = (message: string): AlertActionTypes => {
  return { type: ALERT_SUCCESS, payload: { message } };
};
const alertFailure = (message: string): AlertActionTypes => {
  return { type: ALERT_FAILURE, payload: { message } };
};
const alertClear = (): AlertActionTypes => {
  return { type: ALERT_CLEAR };
};
export { alertSucess, alertFailure, alertClear };
