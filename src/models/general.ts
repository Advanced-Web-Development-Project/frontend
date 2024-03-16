export type User = {
    id: string,
    avatar: string,
    comments: any[],
    createdAt: Date,
    email: string,
    name: string,
    posts: string[],
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
    matchedPassword: string,
}

export type DynamicUserOS = UserOS & {
    [key: string]: any;
};

export type Post = {
    postId: string,
    comments: string[],
    username: string,
    title: string,
    imagePath: string,
    likes: string[],
    dislikes: string[],
    content: string,
    createdAt: Date,
    updatedAt: Date
}

export type PostOnScreen = {
    // userId: string,
    title: string,
    image?: string,
    imagePath?: string,
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
    AddPost = "ADD_POST",
    SpecificPost = "SPECIFIC_POST",
    UserProfile = "USER_PROFILE"
}

export enum PostCategory {
    MyPosts = "general",
    Tech = "technology",
    Sport = "sports",
    Science = "science",
    AllPosts = "all_posts"
}

type ErrorObject = { message: string;[key: string]: unknown };
type ErrorType = string | ErrorObject;

// export type HttpResponse = {
//     timeStamp: string,
//     statusCode: number,
//     status: string,
//     message?: string,
//     data: object,
// } | { // error
//     timeStamp: string,
//     statusCode: number,
//     status: string,
//     errors: string[];
// }

export type HttpErrorResponse = {
    response: {
        data: {
            timeStamp: string,
            statusCode: number,
            status: string,
            errors: string[];
        }
    }
}

export type HttpSuccessResponse = {
    response: {
        data: {
            timeStamp: string,
            statusCode: number,
            status: string,
            message?: string,
            data: object,
        }
    }
}
