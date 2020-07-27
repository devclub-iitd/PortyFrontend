import axios from 'axios';

// baseURL: 'https://porty-backend-devclub.herokuapp.com',
export default axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json',
    withCredentials: true,
});
