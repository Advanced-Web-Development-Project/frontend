import axios from 'axios';
import { User } from '../models/general';

export const server = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your API server's URL
});

export const signupAPI = async (user: User) => {
    const { matchedPassword, ...userDTO } = user;
    const response = await server.post('/auth/register', userDTO);
    return response
}

export const loginAPI = async (email: string, password: string) => {
    const response = await server.post('/auth/login', { email, password });
    return response
} 