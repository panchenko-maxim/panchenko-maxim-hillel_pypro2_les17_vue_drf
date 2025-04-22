import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    error => Promise.reject(error)
);


axios.interceptors.response.use(
    response => response,
    async error => {
       const originalRequest = error.config;
       if (error.response.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://localhost:8000/api/token/refresh', {refresh: refreshToken});
            localStorage.setItem('access_token', response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return axios(originalRequest);
       }
       return Promise.reject(error);
    }
);


createApp(App).use(router).mount('#app')
