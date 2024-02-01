import axios from 'axios';
import { User, UserOS } from '../models/general';
import { server } from '.';


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

export const refreshTokenAPI = async (): Promise<any> => {
    const response = await server.post('/auth/login',);
    return response
}


