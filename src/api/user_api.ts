import { AxiosResponse } from "axios";
import { User } from "../models/general";
import { server } from "./auth_api"
import { ProfileFileds } from "../pages/profile/service";

export const updateUserAPI = async (username: string, accessToken: string, user: Partial<ProfileFileds>): Promise<User> => {
    const response = await server.patch(`/users/${username}`, user, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    const editedUser = response.data.data
    return editedUser
}

export const deleteUserAPI = async (userId: string, accessToken: string): Promise<User> => {
    const response = await server.delete(`/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const deletedUser = response.data.data
    return deletedUser
}
