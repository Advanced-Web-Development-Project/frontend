import axios from "axios";
import axiosInterceptors from 'axios-interceptors';
import Cookies from "js-cookie";

const serverUrl = process.env.REACT_APP_SERVER_URL_DEV;

export const server = axios.create({
    baseURL: serverUrl,
});


// Add a request interceptor
server.interceptors.request.use(
    (config) => {
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
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refreshToken');

                if (!refreshToken) throw 'err'

                const response = await server.post('/auth/refresh-token', { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;

                Cookies.set('accessToken', accessToken);
                Cookies.set('refreshToken', newRefreshToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
            }
        }

        return Promise.reject(error);
    }
);
