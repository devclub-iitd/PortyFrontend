import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR
        })
        dispatch(setAlert("Server Error","red"))
    }
}

export const createProfile = (formData , edit = false) => async dispatch => {
    try {
        
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData , config)

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
        console.log("data posted")
        //console.log(res.data)
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','green'))


    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')))
        }

        dispatch({
            type : PROFILE_ERROR
        })
    }
}