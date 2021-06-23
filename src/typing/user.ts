import { IProfile } from './profile';
import { IProposal } from './proposal';

export type IUserData = Omit<IProfile, 'birthYear' | 'gender'>;
export type IUserProposal = Omit<IProposal, 'author'>;

export interface IUser {
    proposals: IUserProposal[];
    data: IUserData;
}

export interface IUserResponse extends IUserData {
    proposals: IUserProposal[];
}
