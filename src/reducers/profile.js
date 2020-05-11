import {
    GET_PROFILE,
    GETTING_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
} from '../actions/types';

const intialState = {
    profile: null,
    error: {},
    loading: true,
};

export default function (state = intialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE: {
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        }
        case GETTING_PROFILE: {
            return {
                ...state,
                profile: null,
                loading: true,
            };
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                error: payload,
                loading: false,
            };
        }
        case CLEAR_PROFILE: {
            return {
                ...state,
                profile: null,
                loading: false,
            };
        }
        default:
            return state;
    }
}
