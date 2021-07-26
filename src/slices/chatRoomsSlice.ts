import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChatroomStatus } from '@utils/chat';
import { IChatroom, IChatroomResponse } from '@typing/chat';
import { IGenericRemote, RequestStatus } from '@typing/api';
import { IChatroomStatus, ChatroomMessage } from '@typing/chat';
import { RootState, storeToast } from '@store/rootReducer';
import apiService from '@services/apiService';
import { getProfileDataSelector, removeProfile } from './profileSlice';

export interface IChatroomDetails {
    proposal: string;
    initiator: string;
    initialMessage: string;
}

export interface IChatroomsState {
    hasNewMessage: boolean;
    createChatroomRequestStatus: RequestStatus;
    chageChatroomStatusRequestStatus: RequestStatus;
    details: IGenericRemote<IChatroom>;
    chatroomMessageList: IGenericRemote<ChatroomMessage[]>;
    chatroomList: IGenericRemote<IChatroom[]>;
}

const initialState: IChatroomsState = {
    hasNewMessage: false,
    createChatroomRequestStatus: RequestStatus.IDLE,
    chageChatroomStatusRequestStatus: RequestStatus.IDLE,
    details: {
        requestStatus: RequestStatus.IDLE,
        data: {} as IChatroom,
    },
    chatroomList: {
        requestStatus: RequestStatus.IDLE,
        data: [],
    },
    chatroomMessageList: {
        requestStatus: RequestStatus.IDLE,
        data: [],
    },
};

/**
 * Slice
 */
// TODO: split to paginate slice and proposal slice
const chatroomsSlice = createSlice({
    name: 'chatrooms',
    initialState,
    reducers: {
        setChatroomList(state, { payload }: PayloadAction<IChatroom[]>) {
            state.chatroomList.data = payload;
        },
        setChatroomListRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chatroomList.requestStatus = payload;
        },
        setDetails(state, { payload: chatroomDetails }: PayloadAction<IChatroomResponse>) {
            state.details.data = { ...chatroomDetails, status: getChatroomStatus(chatroomDetails.status) };
        },
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        resetDetails(state) {
            state.details.data = {} as IChatroom;
            state.details.requestStatus = RequestStatus.IDLE;
        },
        setChatroomMessageList(state, { payload }: PayloadAction<ChatroomMessage[]>) {
            state.chatroomMessageList.data = payload;
        },
        setChatroomMessageListRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chatroomMessageList.requestStatus = payload;
        },
        resetChatroomMessageList(state) {
            state.chatroomMessageList.data = [];
            state.chatroomMessageList.requestStatus = RequestStatus.IDLE;
        },
        setChangeChatroomStatusRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chageChatroomStatusRequestStatus = payload;
        },
        setChatroomCreateStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.createChatroomRequestStatus = payload;
        },
        setHasNewMessage(state, { payload }: PayloadAction<boolean>) {
            state.hasNewMessage = payload;
        },
    },
    extraReducers: {
        [removeProfile.type]: () => initialState,
    },
});

/**
 * Sync actions
 */
export const {
    resetChatroomMessageList,
    resetDetails,
    setChangeChatroomStatusRequestStatus,
    setChatroomCreateStatus,
    setChatroomList,
    setChatroomListRequestStatus,
    setChatroomMessageList,
    setChatroomMessageListRequestStatus,
    setDetails,
    setDetailsRequestStatus,
    setHasNewMessage,
} = chatroomsSlice.actions;

/**
 * Async actions
 */
export const fetchDetailsAsync = (chatroomId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setDetailsRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: chatroomDetails }: { data: IChatroomResponse } = await apiService.get(
            `${BACKEND_ROUTING.CHAT.CHATROOMS}/${chatroomId}`
        );

        dispatch(setDetails(chatroomDetails));
        dispatch(setDetailsRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(resetDetails());
        dispatch(setDetailsRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Partnerstwo',
            message: 'Nie udało się pobrać danie tego partnerstwa',
        });

        console.error('Fetch proposal details error:', error);
    }
};

export const createChatroomAsync = ({
    initialMessage,
    proposal,
}: Omit<IChatroomDetails, 'initiator'>): AppThunk => async (dispatch: AppDispatch, getState) => {
    dispatch(setChatroomCreateStatus(RequestStatus.FETCHING));

    try {
        const state = getState();
        const initiator = getProfileDataSelector(state).id;
        const chatroomDetails = {
            initialMessage,
            proposal,
            initiator,
        };

        /**
         * This method return new chatroom object
         */
        await apiService.post(BACKEND_ROUTING.CHAT.CREATE_CHATROOM, chatroomDetails);

        storeToast({
            status: 'success',
            title: 'Partnerstwo',
            message: 'Propozycja została pomyślnie wysłana',
        });

        dispatch(setChatroomCreateStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(setChatroomCreateStatus(RequestStatus.ERROR));
        storeToast({
            status: 'error',
            title: 'Partnerstwo',
            message: 'Nie udało się wysłać proposycji',
        });

        console.error('Create chat room error:', error);
    }
    setTimeout(() => dispatch(setChatroomCreateStatus(RequestStatus.IDLE)), 100);
};

export const changeChatroomStatusAsync = ({
    chatroomId,
    status,
}: {
    chatroomId: string;
    status: IChatroomStatus;
}): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setChangeChatroomStatusRequestStatus(RequestStatus.FETCHING));

    try {
        await apiService.get(`${BACKEND_ROUTING.CHAT.CHATROOMS}/${chatroomId}/${status}`);

        const statusName = status === IChatroomStatus.APPROVE ? 'zaakceptowana' : 'odrzucona';

        storeToast({
            status: 'success',
            title: 'Chat',
            message: `Propozycja została ${statusName}`,
        });

        dispatch(setChangeChatroomStatusRequestStatus(RequestStatus.FETCHING));
    } catch (error) {
        dispatch(setChangeChatroomStatusRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Chat',
            message: 'Nie udało się zaakceptować / odrzucić propozycję',
        });

        console.error('Change chat room status:', error);
    }
    setTimeout(() => dispatch(setChangeChatroomStatusRequestStatus(RequestStatus.IDLE)), 100);
};

/**
 * Selectors
 */
export const getChatroomListSelector = (state: RootState) => state.chatrooms.chatroomList.data;
export const getChatroomListRequestStatusMapSelector = (state: RootState) => state.chatrooms.chatroomList.requestStatus;

export const getHasNewMessageSelector = (state: RootState) => state.chatrooms.hasNewMessage;

export const getChatroomMessageListSelector = (state: RootState) => state.chatrooms.chatroomMessageList.data;
export const getChatroomMessageListRequestStatusSelector = (state: RootState) =>
    state.chatrooms.chatroomMessageList.requestStatus;

export const getDetailsRequestStatusSelector = (state: RootState) => state.chatrooms.details.requestStatus;
export const getDetailsSelector = (state: RootState) => state.chatrooms.details.data;

export const getCreateChatroomRequestStatusSelector = (state: RootState) => state.chatrooms.createChatroomRequestStatus;
export const getChangeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatrooms.chageChatroomStatusRequestStatus;

export default chatroomsSlice.reducer;
