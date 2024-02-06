import { AxiosResponse } from "axios";
import { User } from "../models/general";
import { server } from "./index"
import { ProfileFileds } from "../pages/profile/service";

export const updateUserAPI = async (username: string, user: Partial<ProfileFileds>): Promise<User> => {
    const response = await server.patch(`/users/${username}`, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    const editedUser = response.data.data
    return editedUser
}

export const deleteUserAPI = async (userId: string): Promise<User> => {
    const response = await server.delete(`/users/${userId}`);
    return response.data
}

export const getUserInfoAPI = async () => {
    const response = await server.get('/users/me');
    return response.data
}

export const deleteUserImageAPI = async (): Promise<User> => {
    const response = await server.delete(`/users/avatar`);
    return response.data
}
