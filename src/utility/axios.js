import axios from 'axios';

// baseURL: 'http://localhost:5000',
export default axios.create({
    baseURL: 'https://portfolioback.devclub.in',
    responseType: 'json',
    withCredentials: true,
});
