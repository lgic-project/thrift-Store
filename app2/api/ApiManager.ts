import axios from 'axios';

const ApiManager = axios.create({
    baseURL: 'http://192.168.1.67:8000/api',
    responseType: 'json',
    withCredentials:true,
})

export default ApiManager;