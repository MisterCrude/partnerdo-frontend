import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getChatroomStatus } from '@utils/chat';
import { IChatroom, IChatroomResponse } from '@typing/chat';
import { IGenericRemote, RequestStatus } from '@typing/api';
import { IChatroomStatus } from '@typing/chat';
import { keys } from 'lodash/fp';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { RootState, storeToast } from '@store/rootReducer';
import { toDict } from '@utils/convert';
import apiService from '@services/apiService';
import { getProfileDataSelector } from './profileSlice';

export interface IChatroomDetails {
    proposal: string;
    initiator: string;
    initialMessage: string;
}

export interface IChatroomsState {
    createChatroomRequestStatus: RequestStatus;
    chageChatroomStatusRequestStatus: RequestStatus;
    details: IGenericRemote<IChatroom>;
    chatroomList: IGenericRemote<IChatroom[]>;
}

const initialState: IChatroomsState = {
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
};

/**
 * Slice
 */
// TODO: split to paginate slice and proposal slice
const chatroomsSlice = createSlice({
    name: 'chatrooms',
    initialState,
    reducers: {
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        setDetails(state, { payload: chatroomDetails }: PayloadAction<IChatroomResponse>) {
            state.details.data = { ...chatroomDetails, status: getChatroomStatus(chatroomDetails.status) };
        },
        resetDetails(state) {
            state.details.data = {} as IChatroom;
            state.details.requestStatus = RequestStatus.IDLE;
        },
        setChangeChatroomStatusRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chageChatroomStatusRequestStatus = payload;
        },
        setChatroomCreateStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.createChatroomRequestStatus = payload;
        },
    },
});

/**
 * Sync actions
 */
export const {
    resetDetails,
    setDetails,
    setDetailsRequestStatus,
    setChatroomCreateStatus,
    setChangeChatroomStatusRequestStatus,
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

export const getDetailsRequestStatusSelector = (state: RootState) => state.chatrooms.details.requestStatus;
export const getDetailsSelector = (state: RootState) => state.chatrooms.details.data;

export const getCreateChatroomRequestStatusSelector = (state: RootState) => state.chatrooms.createChatroomRequestStatus;
export const getChangeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatrooms.chageChatroomStatusRequestStatus;

export default chatroomsSlice.reducer;
