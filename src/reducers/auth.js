import { USER_LOADED, AUTH_ERROR, LOG_OUT } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        }
        default:
            return state;
    }
}
