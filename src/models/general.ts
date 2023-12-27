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

// export type DynamicUser = User | { [key: string]: string }
