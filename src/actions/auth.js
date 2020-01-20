import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setauthtoken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
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

// Register User

export const register = ({name , email , password , entryno , phone , dob , website }) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name , email , password , entryno , phone , dob , website })

    try {
        dispatch(setAlert('Please wait while we create your account', 'green'));
        const res = await axios.post('api/user', body , config)
        dispatch(setAlert('Register Success...Check your email for verification','green'))
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg , 'red')))
        }

        dispatch({
            type : REGISTER_FAIL
        })
    }
}

//Login User
export const login = ({email,password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password})
    //console.log(body)

    try  {
        const res = await axios.post('/api/auth', body, config)
        console.log(body)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        await dispatch(loadUser());

    } catch (err) {

        dispatch({
            type: LOGIN_FAIL
        })

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg , 'red')))
        }

        //dispatch(setAlert("Login Failed", 'red'))
    }
}

//LogOUt

export const logout = () => dispatch => {
    dispatch({type : LOG_OUT})
    dispatch({type : CLEAR_PROFILE})
}
