import { User, DynamicUser } from "../../models/general"

type keyofUSer = keyof User

type UserOnScreen = {
    key: keyofUSer,
    desc: string,
    type: "text" | "password"
}

export const validateUser = ({ username, email, password, matchedPassword }: User) => {
    if (username.trim() === "" || email.trim() === "" || password.trim() === "" || matchedPassword.trim() === "") return "Fill all the requierd fields"
    if (password !== matchedPassword) return "Passwords dont match"
    return ""
}

export const initialUser: DynamicUser = {
    id: '',
    username: '',
    name: '',
    email: '',
    password: '',
    matchedPassword: '',
};

export const initProfile: Partial<DynamicUser> = {
    id: '',
    username: '',
    name: '',
    email: '',
};

export const userOutput: UserOnScreen[] = [
    { key: 'email', desc: 'Email', type: "text" },
    { key: 'name', desc: 'Name', type: "text" },
    { key: 'username', desc: 'User Name', type: "text" },
    { key: 'password', desc: 'Password', type: "password" },
    { key: 'matchedPassword', desc: 'Matched Password', type: "password" },
]

export const profileOutput: UserOnScreen[] = [
    { key: 'email', desc: 'Email', type: "text" },
    { key: 'name', desc: 'Name', type: "text" },
    { key: 'username', desc: 'User Name', type: "text" },
]
