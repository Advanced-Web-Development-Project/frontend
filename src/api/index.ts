import axios from "axios";
import axiosInterceptors from 'axios-interceptors';
import Cookies from "js-cookie";

export const server = axios.create({
    baseURL: 'http://localhost:8000',
});


// Add a request interceptor
server.interceptors.request.use(
    (config) => {
        debugger;
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
server.interceptors.response.use(
    (response) => response,
    async (error) => {
        debugger;
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refreshToken');
                const response = await axios.post('/auth/refresh-token', { refreshToken });
                const { token } = response.data;

                Cookies.set('accessToken', token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                throw error
            }
        }

        return Promise.reject(error);
    }
);
