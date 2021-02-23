export interface IUser {
    avatar: string;
    birthYear: string;
    description: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    sex: string;
    username: string;
}

export interface ITokenResponse {
    key: string;
}

export type IUserResponse = IUser;
