import axios from '../utility/axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOG_OUT,
    CLEAR_PROFILE,
} from './types';
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

export const regenerateOtp = (email) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email });

    try {
        dispatch(setAlert('Please wait while we send the email.', 'green'));
        // console.log(body);
        const res = await axios.post('/api/user/otp', body, config);

        dispatch(
            setAlert(
                'We have sent an email...Check your email for verification',
                'green'
            )
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
        });

        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        }
    }
};

// reset pass
export const resetPass = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        dispatch(setAlert('Please wait while we send the email.', 'green'));
        // console.log(body);
        const res = await axios.post('/api/user/forgot', body, config);

        dispatch(
            setAlert(
                'We have sent an email...Check your email to confirm password change',
                'green'
            )
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
        });

        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        }
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
