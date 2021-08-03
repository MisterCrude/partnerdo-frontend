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
    MESSAGE_LIST = 'message_list',
    CONNECT_TO_CHATROOM = 'connect_to_chatroom',
    CHATROOM_MESSAGE = 'chatroom_message',
    CHATROOM_STATUS = 'chatroom_status',
    NOTIFICATION_TYPE = 'notification_type',
}

export enum WSReadyState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}
