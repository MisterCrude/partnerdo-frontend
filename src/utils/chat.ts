import { IChatRoomStatus } from '@models/chat';

export const getChatRoomStatus = (status: string) => {
    switch (String(status)) {
        case '1':
            return IChatRoomStatus.APPROVE;
        case '2':
            return IChatRoomStatus.REJECT;
        default:
        case '0':
            return IChatRoomStatus.IDLE;
    }
};
