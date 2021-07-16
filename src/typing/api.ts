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

export interface IWSMessage<T> {
    type: WSMessageTypes;
    message?: T;
}

export enum WSMessageTypes {
    CHATROOM_LIST = 'chatroom_list',
    CHATROOM_MESSAGE_LIST = 'chatroom_message_list',
    CONNECT_TO_CHATROOM = 'connect_to_chatroom',
    HAS_NEW_MESSAGE = 'has_new_message',
    NEW_CHATROOM_MESSAGE = 'new_chatroom_message',
}

export enum WSReadyState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}
