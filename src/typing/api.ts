import { ChatroomMessage } from '@typing/chat';

export type IPaginationResponse<T> = {
    count: number;
    next: string;
    previous: string;
    results: T[];
};

export enum RequestStatus {
    IDLE = 'idle',
    FETCHING = 'fetching',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface IGenericRemote<T> {
    data: T;
    requestStatus: RequestStatus;
}

export interface WSResponse {
    message: ChatroomMessage[];
    type: WSMessageTypes;
}

export interface WSRequest {
    message: string;
    type: WSMessageTypes;
}

export enum WSMessageTypes {
    SEND_CHATROOM_MESSAGES = 'send_chatroom_messages',
    NEW_CHATROOM_MESSAGE = 'new_chatroom_message',
}
