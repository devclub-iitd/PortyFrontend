import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://portfolioback.devclub.in',
    responseType: 'json',
    withCredentials: true,
});
