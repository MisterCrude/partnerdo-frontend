import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getChatroomStatus } from '@utils/chat';
import { getQueryParamsString, countOffset } from '@src/utils/pagination';
import { IChatroom, IChatroomResponse } from '@typing/chat';
import { IPaginationResponse, IGenericRemote, RequestStatus } from '@typing/api';
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
interface INormalisedResponse {
    results: IChatroomResponse[];
    count: number;
    pageNumber: number;
}

interface IPagination {
    count: number;
    currentPage: number;
    requestStatus: RequestStatus;
    pages: Record<number, string[]>;
}

export interface IChatroomsState {
    createChatroomRequestStatus: RequestStatus;
    chageChatroomStatusRequestStatus: RequestStatus;
    details: IGenericRemote<IChatroom>;
    pagination: {
        chatrooms: IPagination;
    };
    chatrooms: Record<string, IChatroom>;
}

const initialChatroomItem: IPagination = {
    count: 0,
    currentPage: 1,
    requestStatus: RequestStatus.IDLE,
    pages: {},
};

const initialState: IChatroomsState = {
    createChatroomRequestStatus: RequestStatus.IDLE,
    chageChatroomStatusRequestStatus: RequestStatus.IDLE,
    details: {
        data: {} as IChatroom,
        requestStatus: RequestStatus.IDLE,
    },
    pagination: {
        chatrooms: initialChatroomItem,
    },
    chatrooms: {},
};

export const getQueryParams = (pageNumber: number) =>
    getQueryParamsString({
        limit: String(PAGINATION_ITEMS_LIMIT),
        offset: String(countOffset(pageNumber || 1, PAGINATION_ITEMS_LIMIT)),
    });

/**
 * Slice
 */
// TODO: split to paginate slice and proposal slice
const chatroomsSlice = createSlice({
    name: 'chatrooms',
    initialState,
    reducers: {
        setPaginationRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.pagination.chatrooms.requestStatus = payload;
        },
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        setChangeChatroomStatusRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chageChatroomStatusRequestStatus = payload;
        },
        setChatroomCreateStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.createChatroomRequestStatus = payload;
        },
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.chatrooms.pages[pageNumber] = [];
        },
        setDetails(state, { payload: chatroomDetails }: PayloadAction<IChatroomResponse>) {
            state.details.data = { ...chatroomDetails, status: getChatroomStatus(chatroomDetails.status) };
        },
        receivePage(state, { payload: { results, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            const normalizedResults = results.map((item) => ({
                ...item,
                status: getChatroomStatus(item.status),
            }));
            const chatrooms = toDict<IChatroom>(normalizedResults, 'id');

            state.chatrooms = chatrooms;
            state.pagination.chatrooms.count = count;
            state.pagination.chatrooms.currentPage = pageNumber;
            state.pagination.chatrooms.pages[pageNumber] = keys(chatrooms);
        },
        resetDetails(state) {
            state.details.data = {} as IChatroom;
            state.details.requestStatus = RequestStatus.IDLE;
        },
        resetPagination(state) {
            state.pagination.chatrooms = initialChatroomItem;
            state.chatrooms = {};
        },
    },
});

/**
 * Sync actions
 */
export const {
    receivePage,
    resetDetails,
    resetPagination,
    setDetails,
    setDetailsRequestStatus,
    setPage,
    setPaginationRequestStatus,
    setChatroomCreateStatus,
    setChangeChatroomStatusRequestStatus,
} = chatroomsSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync = (pageNumber?: number): AppThunk => async (dispatch: AppDispatch) => {
    const isInitialFetch = !pageNumber;
    if (isInitialFetch) dispatch(setPaginationRequestStatus(RequestStatus.FETCHING));

    try {
        const normalizedPageNumber = pageNumber || 1;

        dispatch(setPage(normalizedPageNumber));

        const {
            data: { results, count },
        }: { data: IPaginationResponse<IChatroomResponse> } = await apiService.get(
            `${BACKEND_ROUTING.CHAT.CHATROOMS}?${getQueryParams(normalizedPageNumber)}`
        );

        dispatch(receivePage({ results, count, pageNumber: normalizedPageNumber }));
        dispatch(setPaginationRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(resetPagination());
        dispatch(setPaginationRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Wiadomoci',
            message: `Nie udało się pobrać listę wiadomości`,
        });

        console.error('Fetch chat room page error:', error);
    }
};

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
export const getChatroomsPageRequestStatusSelector = (state: RootState) =>
    state.chatrooms.pagination.chatrooms.requestStatus;

export const getChatroomsCountSelector = (state: RootState) => state.chatrooms.pagination.chatrooms.count;
export const getPagesAmountSelector = createSelector(getChatroomsCountSelector, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);

export const getCurrentPageNumberRoomsSelector = (state: RootState) => state.chatrooms.pagination.chatrooms.currentPage;
export const getPagesSelector = (state: RootState) => state.chatrooms.pagination.chatrooms.pages;
export const getChatroomsSelector = (state: RootState) => state.chatrooms.chatrooms;
export const getCurrentPageChatroomsSelector = createSelector(
    getCurrentPageNumberRoomsSelector,
    getPagesSelector,
    getChatroomsSelector,
    (currentPageNumber, pages, chatrooms) =>
        pages[currentPageNumber] ? pages[currentPageNumber].map((id) => chatrooms[id]) : []
);

export const getDetailsRequestStatusSelector = (state: RootState) => state.chatrooms.details.requestStatus;
export const getDetailsDataSelector = (state: RootState) => state.chatrooms.details.data;

export const getCreateChatroomRequestStatusSelector = (state: RootState) => state.chatrooms.createChatroomRequestStatus;
export const getChangeChatroomStatusRequestStatusSelector = (state: RootState) =>
    state.chatrooms.chageChatroomStatusRequestStatus;

export default chatroomsSlice.reducer;
