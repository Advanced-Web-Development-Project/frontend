import { UserOS } from "../../models/general";

export type ProfileFileds = {
    username: string;
    email: string;
    name: string;
    // password: string;
    avatar: File | null;
    [key: string]: any;

}

type ProfileFieldsOutput = {
    key: string;
    desc: string;
    type: "text" | "file";
    accept: string;
}

export const initialProfileFields: ProfileFileds = {
    email: "",
    name: "",
    username: "",
    avatar: null
}



export const profileOutput: ProfileFieldsOutput[] = [
    { key: 'email', desc: 'Email', type: "text", accept: '' },
    { key: 'name', desc: 'Name', type: "text", accept: '' },
    { key: 'username', desc: 'User Name', type: "text", accept: '' },
    { key: 'imagePath', desc: 'Image', type: "file", accept: 'image/*' },
]

export const getUpdatedFieldFromUser = (oldUserFields: ProfileFileds, newUserFields: ProfileFileds, imageFile: File | null) => {

    let result: Partial<ProfileFileds> = {}
    Object.keys(oldUserFields).forEach(key => {
        if (key in newUserFields && oldUserFields[key] !== newUserFields[key]) {
            result[key] = newUserFields[key]
        }
    })

    if (imageFile) {
        result['avatar'] = imageFile
    }

    return result
}

