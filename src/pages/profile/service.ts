import { User, UserOS } from "../../models/general";

export type ProfileFileds = {
    username: string;
    email: string;
    name: string;
    password: string;
    avatar: File | null;
    [key: string]: any;

}

type ProfileFieldsOutput = {
    key: string;
    desc: string;
    type: "text" | "file" | "password";
    accept: string;
}

export const initialProfileFields: ProfileFileds = {
    email: "",
    name: "",
    username: "",
    password: "",
    avatar: null
}



export const getProfileOutput = (provider: string): ProfileFieldsOutput[] => {
    const fields: ProfileFieldsOutput[] = [
        { key: 'email', desc: 'Email', type: "text", accept: '' },
        { key: 'name', desc: 'Name', type: "text", accept: '' },
        { key: 'username', desc: 'User Name', type: "text", accept: '' },
        { key: 'imagePath', desc: 'Image', type: "file", accept: 'image/*' },
    ]
    if (provider !== 'google') {
        fields.splice(3, 0, { key: 'password', desc: 'Password', type: "password", accept: '' })
        // fields.push({ key: 'password', desc: 'Password', type: "password", accept: '' })
    }
    return fields
}

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

