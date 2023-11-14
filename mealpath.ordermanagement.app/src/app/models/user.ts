export interface User{
    userName: string;
    displayName: string;
    token: string;
    img?: string;
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}
