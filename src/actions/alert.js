import { v4 as uuid } from 'uuid';
import { SET_ALERT } from './types';

const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });
};

export default setAlert;
