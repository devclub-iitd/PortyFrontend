/* eslint-disable no-console */
import axios from 'axios';
import setAlert from './alert';
import { GET_PROFILE, GETTING_PROFILE, PROFILE_ERROR } from './types';
// import { loadUser } from './auth';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        // dispatch({
        //     type : GETTING_PROFILE
        // })

        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
        });
        dispatch(setAlert('Server Error', 'red'));
    }
};

export const getProfile = () => async (dispatch) => {
    try {
        // dispatch({
        //     type : GETTING_PROFILE
        // })

        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
        });
        dispatch(setAlert('Server Error', 'red'));
    }
};

export const getFullProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: GETTING_PROFILE,
        });

        const res = await axios.get('/api/profile/mefull');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
        });
        dispatch(setAlert('Server Error', 'red'));
    }
};

// export const UpdateUser = (formdata , edit = true) => async dispatch => {
//     try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         };

//         const res = await axios.post("/api/user/update", formdata, config);

//         dispatch(
//           setAlert(edit ? "Profile Updated" : "Profile Created", "green")
//         );

//     } catch (err) {

//         const errors = err.response.data.errors;

//         if (errors) {
//           errors.forEach(error => dispatch(setAlert(error.msg, "red")));
//         }

//         dispatch({
//           type: PROFILE_ERROR
//         });
//     }
// }

export const getPublicProfile = (entryno) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${entryno}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.log('Error caught in front');
        dispatch({
            type: PROFILE_ERROR,
        });
        dispatch(setAlert('Server Error', 'red'));
    }
};
export const createProfile = (formData, edit) => async (dispatch) => {
    try {
        // console.log(formData)

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // eslint-disable-next-line no-unused-vars
        const res = await axios.post('/api/profile', formData, config);

        // dispatch(loadUser())   used in edit only previously

        // dispatch({     used in both previously
        //   type: GET_PROFILE,
        //   payload: res.data
        // });
        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', 'blue')
        );
    } catch (err) {
        const { errors } = err.response.data;
        dispatch(
            setAlert(
                'An error occurred...Profile could not be created. Please try again.'
            )
        );
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        }

        dispatch({
            type: PROFILE_ERROR,
        });
    }
};
