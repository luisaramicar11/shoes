export interface ILoginResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    access_token: string;
    user:         User;
}

export interface User {
    email: string;
    sub:   number;
    role:  string;
    photo?: string;
}