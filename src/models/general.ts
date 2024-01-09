export type User = {
    id: string
    username: string,
    name: string,
    email: string,
    password: string,
    matchedPassword: string
}

export type DynamicUser = User & {
    [key: string]: any;
};

export type Post = {
    _id: string,
    user: User,
    title: string,
    imagePath: string,
    likes: string[],
    dislikes: string[],
    content: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserStorageInfo = {
    accessToken: string,
    user: User // json stringed
}

export enum DialogPage {
    None = "NONE",
    Login = "LOGIN",
    Signup = "SIGNUP",
    AddPost = "ADDPOST",
}

// export type DynamicUser = User | { [key: string]: string }
