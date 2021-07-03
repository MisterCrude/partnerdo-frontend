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

export interface IWSMessage<T = unknown> {
    message: T;
    type: WSMessageTypes;
}

export enum WSMessageTypes {
    SEND_CHATROOM_MESSAGES = 'send_chatroom_messages',
    SEND_CHATROOM_LIST = 'send_chatroom_list',
    NEW_CHATROOM_MESSAGE = 'new_chatroom_message',
}
