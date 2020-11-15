import axios from 'axios';
import { getBaseUrl } from './utils'

export default axios.create({
    baseURL : getBaseUrl(),
    responseType: 'json',
    withCredentials: true,
});
