import { AxiosResponse } from "axios";
import { User } from "../models/general";
import { server } from "./auth_api"

export const updateUserAPI = async (username: string, accessToken: string, user: Partial<User>): Promise<User> => {
    const response = await server.patch(`/users/${username}` as const, user, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const editedUser = response.data.data
    return editedUser
}

export const deleteUserAPI = async (userId: string, accessToken: string, user: Partial<User>): Promise<User> => {
    const response = await server.delete(`/users/${userId}` as const, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const deletedUser = response.data.data
    return deletedUser
}
