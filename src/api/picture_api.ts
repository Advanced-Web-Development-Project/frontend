import { server } from "./index";


export const getPictureAPI = async (imagePath: string): Promise<any> => {

    const response = await server.get(`/${imagePath}`);
    return response

}
