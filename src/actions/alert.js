import { v4 as uuid } from 'uuid';
import { SET_ALERT } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
