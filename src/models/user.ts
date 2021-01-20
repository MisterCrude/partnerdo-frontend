export interface IUser {
    avatar: string;
    birthYear: string;
    description: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    sex: string;
    shortDescription: string;
    username: string;
}

export interface IUserState {
    data: IUser;
    isAuth: boolean;
    fetching: boolean;
}

export interface ITokenResponce {
    key: string;
}

export type IUserResponce = IUser;
