import { IChatroomStatus } from '@typing/chat';

export const getChatroomStatus = (status: string) => {
    switch (String(status)) {
        case '1':
            return IChatroomStatus.APPROVE;
        case '2':
            return IChatroomStatus.REJECT;
        default:
        case '0':
            return IChatroomStatus.IDLE;
    }
};
