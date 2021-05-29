import { IProfile } from './profile';
import { IProposal } from './proposal';

export type IProposalAuthor = Omit<IProfile, 'birthYear' | 'description' | 'gender' | 'email'>;
export enum IChatRoomStatus {
    IDLE = 'idle',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export interface IChatRoom {
    id: string;
    initiator: IProposalAuthor;
    proposalAuthor: IProposalAuthor;
    proposal: Omit<IProposal, 'author'>;
    status: IChatRoomStatus;
    chatroom: string;
    lastMessage: string;
    created: string;
    initialMessage: string;
    unreadMessageNumber: string;
}

export interface IChatRoomResponse extends Omit<IChatRoom, 'status'> {
    status: string;
}
