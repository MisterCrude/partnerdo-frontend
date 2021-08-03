import { IProfile } from './profile';
import { IProposal } from './proposal';

export type IProposalAuthor = Omit<IProfile, 'birthYear' | 'description' | 'gender' | 'email'>;

export enum NotificationType {
    IDLE,
    NEW_MESSAGE,
    CHANGE_STATUS,
}

// TODO refactor remove  value after =
export enum IChatroomStatus {
    APPROVE = 'approve',
    IDLE = 'idle',
    REJECT = 'reject',
}

export enum IChatroomNotificationType {
    IDLE = 'ID',
    NEW_MESSAGE = 'NM',
    CHANGE_STATUS = 'CS',
    CREATE_CHATROOM = 'CM',
}

export interface IChatroom {
    chatroom: string;
    created: string;
    id: string;
    initialMessage: string;
    initiator: IProposalAuthor;
    lastMessage: string;
    messageTotalAmount: number;
    notificationType: IChatroomNotificationType;
    proposal: Omit<IProposal, 'author'>;
    proposalAuthor: IProposalAuthor;
    status: IChatroomStatus;
    unreadMessageNumber: number;
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
