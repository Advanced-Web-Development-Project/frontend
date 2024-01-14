export type User = {
    id: string,
    avatar: string,
    comments: any[],
    createdAt: Date,
    email: string,
    name: string,
    posts: Post[],
    provider: string,
    updatedAt: Date,
    username: string,

}

export type UserOS = {
    id: string,
    username: string,
    email: string,
    name: string,
    password: string,
    matchedPassword: string
}

export type DynamicUserOS = UserOS & {
    [key: string]: any;
};

export type Post = {
    _id: string,
    comments: string[],
    user: User,
    title: string,
    imagePath: string,
    likes: string[],
    dislikes: string[],
    content: string,
    createdAt: Date,
    updatedAt: Date
}

export type PostOnScreen = {
    comments: string[],
    userId: string,
    title: string,
    imagePath: string,
    content: string,
}

export type UserStorageInfo = {
    accessToken: string,
    user: User // json stringed
}
export type Comment = {
    commentId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    username: string
}

export type CommentDB = {
    commentId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    username: string
}

export enum DialogPage {
    None = "NONE",
    Login = "LOGIN",
    Signup = "SIGNUP",
    AddPost = "ADDPOST",
}