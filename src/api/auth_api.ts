import axios from 'axios';
import { User, UserOS } from '../models/general';

export const server = axios.create({
    baseURL: 'http://localhost:8000',
});

export const signupAPI = async (user: UserOS) => {

    const { email, name, username, password } = user
    const userDTO: Partial<UserOS> = { email, name, username, password }

    const response = await server.post('/auth/register', userDTO);
    return response
}

export const loginAPI = async (email: string, password: string): Promise<any> => {
    const response = await server.post('/auth/login', { email, password });
    return response
}

export const loginWithGoogleAPI = async () => {
    const response = await server.get('/auth/google');
    return response
}


const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
};
