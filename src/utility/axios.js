import axios from 'axios';

export default axios.create({
    baseURL: 'https://porty-backend-devclub.herokuapp.com',
    responseType: 'json',
    // withCredentials: true,
});
