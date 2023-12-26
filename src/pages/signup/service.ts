import { User, DynamicUser } from "../../models/general"

type keyofUSer = keyof User

type UserOnScreen = {
    key: keyofUSer,
    desc: string,
    type: "text" | "password"
}

export const validateUser = ({ userName, email, password, matchedPassword }: User) => {
    if (userName.trim() === "" || email.trim() === "" || password.trim() === "" || matchedPassword.trim() === "") return "Fill all the requierd fields"
    if (password !== matchedPassword) return "Passwords dont match"
    return ""
}

export const initialUser: DynamicUser = {
    userName: '',
    email: '',
    password: '',
    matchedPassword: '',
};

export const userOutput: UserOnScreen[] = [
    { key: 'email', desc: 'Email', type: "text" },
    { key: 'userName', desc: 'User Name', type: "text" },
    { key: 'password', desc: 'Password', type: "password" },
    { key: 'matchedPassword', desc: 'Matched Password', type: "password" },
]