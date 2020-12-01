export interface IUserState {
    data: IUser;
    isAuth: boolean;
    fetching: boolean;
    error: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ITokenResponce {
    key: string;
}

export interface IUserResponce {
    pk: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}
