export type User = {
    userName: string,
    email: string,
    password: string
    matchedPassword: string
}

export type DynamicUser = {
    userName: string;
    email: string;
    password: string;
    matchedPassword: string;
    [key: string]: any;
};

// export type DynamicUser = User | { [key: string]: string }
