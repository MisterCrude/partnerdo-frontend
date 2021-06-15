import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getChatRoomStatus } from '@utils/chat';
import { getQueryParamsString, countOffset } from '@src/utils/pagination';
import { IChatRoom, IChatRoomResponse } from '@models/chat';
import { IPaginationResponse, IGenericRemote, RequestStatus } from '@models/api';
import { IChatRoomStatus } from '@models/chat';
import { keys } from 'lodash/fp';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { RootState, storeToast } from '@store/rootReducer';
import { toDict } from '@utils/convert';
import apiService from '@services/apiService';
import { getProfileDataSelector } from './profileSlice';

export interface IChatRoomDetails {
    proposal: string;
    initiator: string;
    initialMessage: string;
}
interface INormalisedResponse {
    results: IChatRoomResponse[];
    count: number;
    pageNumber: number;
}

interface IPagination {
    count: number;
    currentPage: number;
    requestStatus: RequestStatus;
    pages: Record<number, string[]>;
}

export interface IChatRoomsState {
    createChatRoomRequestStatus: RequestStatus;
    chageChatRoomStatusRequestStatus: RequestStatus;
    details: IGenericRemote<IChatRoom>;
    pagination: {
        chatRooms: IPagination;
    };
    chatRooms: Record<string, IChatRoom>;
}

const initialChatRoomItem: IPagination = {
    count: 0,
    currentPage: 1,
    requestStatus: RequestStatus.IDLE,
    pages: {},
};

const initialState: IChatRoomsState = {
    createChatRoomRequestStatus: RequestStatus.IDLE,
    chageChatRoomStatusRequestStatus: RequestStatus.IDLE,
    details: {
        data: {} as IChatRoom,
        requestStatus: RequestStatus.IDLE,
    },
    pagination: {
        chatRooms: initialChatRoomItem,
    },
    chatRooms: {},
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
const chatRoomsSlice = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {
        setPaginationRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.pagination.chatRooms.requestStatus = payload;
        },
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        setChangeChatRoomStatusRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.chageChatRoomStatusRequestStatus = payload;
        },
        setChatRoomCreateStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.createChatRoomRequestStatus = payload;
        },
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.chatRooms.pages[pageNumber] = [];
        },
        setDetails(state, { payload: chatRoomDetails }: PayloadAction<IChatRoomResponse>) {
            state.details.data = { ...chatRoomDetails, status: getChatRoomStatus(chatRoomDetails.status) };
        },
        receivePage(state, { payload: { results, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            const normalizedResults = results.map((item) => ({
                ...item,
                status: getChatRoomStatus(item.status),
            }));
            const chatRooms = toDict<IChatRoom>(normalizedResults, 'id');

            state.chatRooms = chatRooms;
            state.pagination.chatRooms.count = count;
            state.pagination.chatRooms.currentPage = pageNumber;
            state.pagination.chatRooms.pages[pageNumber] = keys(chatRooms);
        },
        resetDetails(state) {
            state.details.data = {} as IChatRoom;
            state.details.requestStatus = RequestStatus.IDLE;
        },
        resetPagination(state) {
            state.pagination.chatRooms = initialChatRoomItem;
            state.chatRooms = {};
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
    setChatRoomCreateStatus,
    setChangeChatRoomStatusRequestStatus,
} = chatRoomsSlice.actions;

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
        }: { data: IPaginationResponse<IChatRoomResponse> } = await apiService.get(
            `${BACKEND_ROUTING.CHAT.CHAT_ROOMS}?${getQueryParams(normalizedPageNumber)}`
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

export const fetchDetailsAsync = (chatRoomId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setDetailsRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: chatRoomDetails }: { data: IChatRoomResponse } = await apiService.get(
            `${BACKEND_ROUTING.CHAT.CHAT_ROOMS}/${chatRoomId}`
        );

        dispatch(setDetails(chatRoomDetails));
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

export const createChatRoomAsync = ({
    initialMessage,
    proposal,
}: Omit<IChatRoomDetails, 'initiator'>): AppThunk => async (dispatch: AppDispatch, getState) => {
    dispatch(setChatRoomCreateStatus(RequestStatus.FETCHING));

    try {
        const state = getState();
        const initiator = getProfileDataSelector(state).id;
        const chatRoomDetails = {
            initialMessage,
            proposal,
            initiator,
        };

        /**
         * This method return new chatRoom object
         */
        await apiService.post(BACKEND_ROUTING.CHAT.CREATE_CHAT_ROOM, chatRoomDetails);

        storeToast({
            status: 'success',
            title: 'Partnerstwo',
            message: 'Propozycja została pomyślnie wysłana',
        });

        dispatch(setChatRoomCreateStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(setChatRoomCreateStatus(RequestStatus.ERROR));
        storeToast({
            status: 'error',
            title: 'Partnerstwo',
            message: 'Nie udało się wysłać proposycji',
        });

        console.error('Create chat room error:', error);
    }
    setTimeout(() => dispatch(setChatRoomCreateStatus(RequestStatus.IDLE)), 100);
};

export const changeChatRoomStatusAsync = ({
    chatRoomId,
    status,
}: {
    chatRoomId: string;
    status: IChatRoomStatus;
}): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setChangeChatRoomStatusRequestStatus(RequestStatus.FETCHING));

    try {
        await apiService.get(`${BACKEND_ROUTING.CHAT.CHAT_ROOMS}/${chatRoomId}/${status}`);

        const statusName = status === IChatRoomStatus.APPROVE ? 'zaakceptowana' : 'odrzucona';

        storeToast({
            status: 'success',
            title: 'Chat',
            message: `Propozycja została ${statusName}`,
        });

        dispatch(setChangeChatRoomStatusRequestStatus(RequestStatus.FETCHING));
    } catch (error) {
        dispatch(setChangeChatRoomStatusRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Chat',
            message: 'Nie udało się zaakceptować / odrzucić propozycję',
        });

        console.error('Change chat room status:', error);
    }
    setTimeout(() => dispatch(setChangeChatRoomStatusRequestStatus(RequestStatus.IDLE)), 100);
};

/**
 * Selectors
 */
export const getChatRoomsPageRequestStatusSelector = (state: RootState) =>
    state.chatRooms.pagination.chatRooms.requestStatus;

export const getChatRoomsCountSelector = (state: RootState) => state.chatRooms.pagination.chatRooms.count;
export const getPagesAmountSelector = createSelector(getChatRoomsCountSelector, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);

export const getCurrentPageNumberRoomsSelector = (state: RootState) => state.chatRooms.pagination.chatRooms.currentPage;
export const getPagesSelector = (state: RootState) => state.chatRooms.pagination.chatRooms.pages;
export const getChatRoomsSelector = (state: RootState) => state.chatRooms.chatRooms;
export const getCurrentPageChatRoomsSelector = createSelector(
    getCurrentPageNumberRoomsSelector,
    getPagesSelector,
    getChatRoomsSelector,
    (currentPageNumber, pages, chatRooms) =>
        pages[currentPageNumber] ? pages[currentPageNumber].map((id) => chatRooms[id]) : []
);

export const getDetailsRequestStatusSelector = (state: RootState) => state.chatRooms.details.requestStatus;
export const getDetailsDataSelector = (state: RootState) => state.chatRooms.details.data;

export const getCreateChatRoomRequestStatusSelector = (state: RootState) => state.chatRooms.createChatRoomRequestStatus;
export const getChangeChatRoomStatusRequestStatusSelector = (state: RootState) =>
    state.chatRooms.chageChatRoomStatusRequestStatus;

export default chatRoomsSlice.reducer;
