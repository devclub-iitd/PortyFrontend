import axios from 'axios';

// baseURL: 'https://portfolioback.devclub.in',
export default axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json',
    withCredentials: true,
});
