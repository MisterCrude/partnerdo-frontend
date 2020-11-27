export interface IUserState {
    isLogged: boolean;
    data: IUser | null;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ILoginResponce {
    key: string;
}

export interface IUserResponce {
    pk: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}
