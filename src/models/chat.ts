import { IProfile } from './profile';
import { IProposal } from './proposal';

export type IProposalAuthor = Omit<IProfile, 'birthYear' | 'description' | 'gender' | 'email'>;

export enum IChatRoomStatus {
    APPROVE = 'approve',
    IDLE = 'idle',
    REJECT = 'reject',
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

export interface Message {
    created: string;
    message: string;
    type: string;
    sender: Pick<IProfile, 'username' | 'firstName' | 'lastName' | 'id'>;
}

export interface IChatRoomResponse extends Omit<IChatRoom, 'status'> {
    status: string;
}
