export interface IUser {
    avatar: string;
    birthYear: string;
    description: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    gender: string;
    username: string;
}

export interface IAuthTokenResponse {
    key: string;
}

export type IUserResponse = IUser;
