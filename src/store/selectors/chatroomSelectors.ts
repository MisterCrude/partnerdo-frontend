import { RootState } from '@store/rootReducer';

export const getChatroomListSelector = (state: RootState) => state.chatroom.chatroomList.data;
export const getChatroomListRequestStatusMapSelector = (state: RootState) => state.chatroom.chatroomList.requestStatus;

export const getHasNotificationSelector = (state: RootState) => state.chatroom.hasNotification;

export const getChatroomMessageListSelector = (state: RootState) => state.chatroom.chatroomMessageList.data;
export const getChatroomMessageListRequestStatusSelector = (state: RootState) =>
    state.chatroom.chatroomMessageList.requestStatus;

export const getDetailsRequestStatusSelector = (state: RootState) => state.chatroom.details.requestStatus;
export const getDetailsSelector = (state: RootState) => state.chatroom.details.data;

export const getCreateChatroomRequestStatusSelector = (state: RootState) => state.chatroom.createChatroomRequestStatus;
export const getChangeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatroom.chageChatroomStatusRequestStatus;
