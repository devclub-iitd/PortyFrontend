import axios from 'axios'
import {REGISTER_SUCCESS , REGISTER_FAIL , USER_LOADED , AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS} from './types'
import { setAlert } from './alert';
import setAuthToken from '../utility/setauthtoken';


// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : AUTH_ERROR
        })
    }
}



//Register User
export const register = ({name , email , password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
     
    const body = JSON.stringify({name , email , password})
    console.log(body)
    try {
        const res = await axios.post('api/user', body , config)
        //console.log(res.data)
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

    try {
        const res = axios.post('/api/auth', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')))
        }

        dispatch({
            type: LOGIN_FAIL
        })

    }
}