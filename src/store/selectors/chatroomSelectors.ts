import { RootState } from '@store/rootReducer';

export const chatroomListSelector = (state: RootState) => state.chatroom.chatroomList.data;
export const hasNotificationSelector = (state: RootState) => state.chatroom.hasNotification;
export const messageListSelector = (state: RootState) => state.chatroom.chatroomMessageList.data;
export const detailsSelector = (state: RootState) => state.chatroom.details.data;

/**
 * Request status
 */
export const chatroomListRequestStatusSelector = (state: RootState) => state.chatroom.chatroomList.requestStatus;
export const detailsRequestStatusSelector = (state: RootState) => state.chatroom.details.requestStatus;
export const chatroomMessageListRequestStatusSelector = (state: RootState) =>
    state.chatroom.chatroomMessageList.requestStatus;
export const createChatroomRequestStatusSelector = (state: RootState) => state.chatroom.createChatroomRequestStatus;
export const changeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatroom.chageChatroomStatusRequestStatus;
