import { server } from "./auth_api";


export const getPictureAPI = async (imagePath: string): Promise<any> => {

    const response = await server.get(`/${imagePath}`);
    return response

}
