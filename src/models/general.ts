export type User = {
    username: string,
    name: string,
    email: string,
    password: string,
    matchedPassword: string
}

export type DynamicUser = {
    username: string;
    name: string;
    email: string;
    password: string;
    matchedPassword: string;
    [key: string]: any;
};

export type Post = {
    user: string,
    title: string,
    imagePath: string,
    likes: string[],
    dislikes: string[],
    content: string,
    createdAt: Date,
    updatedAt: Date
}

// user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
// },
// title: {
//     type: String,
//     required: true,
// },
// imagePath: {
//     type: String,
//     required: true,
// },
// likes: {
//     type: [String],
//     default: [],
// },
// dislikes: {
//     type: [String],
//     default: [],
// },
// content: {
//     type: String,
//     required: true
// },

export enum DialogPage {
    None = "NONE",
    Login = "LOGIN",
    Signup = "SIGNUP"
}

// export type DynamicUser = User | { [key: string]: string }
