import { IProfile } from './profile';
import { IProposal } from './proposal';

export type IProposalAuthor = Omit<IProfile, 'birthYear' | 'description' | 'gender' | 'email'>;

export enum IChatroomStatus {
    APPROVE = 'approve',
    IDLE = 'idle',
    REJECT = 'reject',
}

export interface IChatroom {
    id: string;
    initiator: IProposalAuthor;
    proposalAuthor: IProposalAuthor;
    proposal: Omit<IProposal, 'author'>;
    status: IChatroomStatus;
    chatroom: string;
    lastMessage: string;
    created: string;
    initialMessage: string;
    unreadMessageNumber: string;
}

export interface ChatroomMessage {
    id: string;
    created: string;
    content: string;
    type: string;
    author: Pick<IProfile, 'username' | 'firstName' | 'lastName' | 'id'>;
}

export interface IChatroomResponse extends Omit<IChatroom, 'status'> {
    status: string;
}
