import { IChatRoomStatus } from '@models/chat';

export const getChatRoomStatus = (status: string) => {
    switch (status) {
        case '1':
            return IChatRoomStatus.APPROVED;
        case '2':
            return IChatRoomStatus.REJECTED;
        default:
        case '0':
            return IChatRoomStatus.IDLE;
    }
};
