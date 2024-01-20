import { server } from "./auth_api";


export const getPictureAPI = async (imagePath: string): Promise<any> => {
    try {
        const response = await server.get(`/${imagePath}`);
        debugger;
        console.log(response)
    } catch (err) {
        debugger;
        console.log(err)
    }

    const a = 3
    const b = 3
}
