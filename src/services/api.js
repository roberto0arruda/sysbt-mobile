import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.100.12/api/v1',
});

export default api;