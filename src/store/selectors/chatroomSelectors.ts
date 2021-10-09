import { RootState } from '@store/rootReducer';
import { IChatroom } from '@typing/chat';

export const chatroomListSelector = (state: RootState) => state.chatroom.chatroomList.data;
export const hasNotificationSelector = (state: RootState) => state.chatroom.hasNotification;
export const messageListSelector = (state: RootState) => state.chatroom.chatroomMessageList.data;
// export const detailsSelector = (state: RootState) => state.chatroom.details.data;
export const detailsSelector = (chatroomId: string) => (state: RootState) =>
    state.chatroom.chatroomList.data.find(({ id }) => id === chatroomId) as IChatroom;

/**
 * Request status
 */
export const chatroomListRequestStatusSelector = (state: RootState) => state.chatroom.chatroomList.requestStatus;
export const chatroomMessageListRequestStatusSelector = (state: RootState) =>
    state.chatroom.chatroomMessageList.requestStatus;
export const createChatroomRequestStatusSelector = (state: RootState) => state.chatroom.createChatroomRequestStatus;
export const changeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatroom.chageChatroomStatusRequestStatus;
