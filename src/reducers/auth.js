import { REGISTER_SUCCESS , REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS , LOG_OUT } from '../actions/types'

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    loading : true,
    user : null,
}

export default function(state = initialState,action){
    const {type , payload} = action
    switch(type){
        case REGISTER_SUCCESS : {
            return {
                ...state,
                isAuthenticated : false,
                loading : false,
            }
        }
        case REGISTER_FAIL : {
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            } 
        }
        case USER_LOADED : {
            return {
                ...state,
                isAuthenticated : true,
                loading : false , 
                user : payload
            }
        }
        case AUTH_ERROR : {
            localStorage.removeItem('token')
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                loading : false,
                user : null
            }
        }
        case LOG_OUT :
        case LOGIN_FAIL : {
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        }
        case LOGIN_SUCCESS : {
            localStorage.setItem('token',payload.token)
            return {
                ...state,
                isAuthenticated: true,
                loading : true,
                user: null
            }
        }
        default : return state
    }
}