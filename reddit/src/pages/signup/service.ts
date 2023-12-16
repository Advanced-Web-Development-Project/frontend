import { User, DynamicUser } from "../../models/general"

type keyofUSer = keyof User

type UserOnScreen = {
    key: keyofUSer,
    desc: string,
    type: "text" | "password"
}

export const validateUser = ({ fullName, userName, city, password, matchedPassword }: User) => {
    if (userName.trim() === "" || city.trim() === "" || fullName.trim() === "" || password.trim() === "" || matchedPassword.trim() === "") return "Fill all the requierd fields"
    if (password !== matchedPassword) return "Passwords dont match"
    return ""
}

export const initialUser: DynamicUser = {
    userName: '',
    fullName: '',
    city: '',
    password: '',
    matchedPassword: '',
};

export const userOutput: UserOnScreen[] = [
    { key: 'userName', desc: 'User Name', type: "text" },
    { key: 'fullName', desc: 'Full Name', type: "text" },
    { key: 'city', desc: 'City', type: "text" },
    { key: 'password', desc: 'Password', type: "password" },
    { key: 'matchedPassword', desc: 'Matched Password', type: "password" },
]