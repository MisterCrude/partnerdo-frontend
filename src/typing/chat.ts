import { IProfile } from './profile';
import { IProposal } from './proposal';

type ICompanion = Omit<IProfile, 'birthYear' | 'description' | 'gender' | 'email'>;

export enum IChatroomStatus {
    APPROVED = 'AP',
    IDLE = 'ID',
    REJECTED = 'RJ',
}

export enum IChatroomNotificationType {
    IDLE = 'ID',
    NEW_MESSAGE = 'NM',
    CHANGE_STATUS = 'CS',
    CREATE_CHATROOM = 'CC',
}

export interface IChatroom {
    chatroom: string;
    companion: ICompanion;
    proposal: Omit<IProposal, 'created'>;
    id: string;
    initialMessage: string;
    lastMessage: string;
    messageTotalAmount: number;
    notificationType: IChatroomNotificationType;
    status: IChatroomStatus;
    unreadMessageAmount: number;
    created: string;
}

export interface ChatroomMessage {
    id: string;
    created: string;
    content: string;
    type: string;
    author: Pick<IProfile, 'username' | 'firstName' | 'lastName' | 'id'>;
}

export type IChatroomResponse = IChatroom;
