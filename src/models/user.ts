export interface IUser {
    isLogged: boolean;
    data: IUserData | null;
}

export interface IUserData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}
