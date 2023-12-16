export type User = {
    userName: string,
    fullName: string,
    city: string,
    password: string
    matchedPassword: string
}

export type DynamicUser = {
    userName?: string;
    fullName?: string;
    city?: string;
    password?: string;
    matchedPassword?: string;
    [key: string]: any;
};

// export type DynamicUser = User | { [key: string]: string }
