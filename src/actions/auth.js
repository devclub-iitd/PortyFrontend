import axios from '../utility/axios';
import { USER_LOADED, AUTH_ERROR, LOG_OUT, CLEAR_PROFILE } from './types';
import setAlert from './alert';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Logout
export const logout = () => async (dispatch) => {
    try {
        await axios({
            url: '/api/auth/logout',
            method: 'POST',
        });
        dispatch({ type: LOG_OUT });
        dispatch({ type: CLEAR_PROFILE });
    } catch (err) {
        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        }
    }
};
