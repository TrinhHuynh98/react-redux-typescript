export const ALERT_CLEAR = "ALERT_CLEAR";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_FAILURE = "ALERT_FAILURE";

interface AlterSuccess {
  type: typeof ALERT_SUCCESS;
  payload: {
    message: string;
  };
}

interface AlertFailure {
  type: typeof ALERT_FAILURE;
  payload: {
    message: string;
  };
}

interface AlertClear {
  type: typeof ALERT_CLEAR;
}

export interface AlertState {
  type: string | null;
  message: string | null;
}

export type AlertActionTypes = AlterSuccess | AlertFailure | AlertClear;
