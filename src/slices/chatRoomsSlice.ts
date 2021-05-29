import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getQueryParamsString, countOffset } from '@src/utils/pagination';
import { IChatRoom, IChatRoomResponse, IChatRoomStatus } from '@models/chat';
import { IPaginationResponse } from '@models/api';
import { keys } from 'lodash/fp';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { RequestStatus } from '@models/misc';
import { RootState, storeToast } from '@store/rootReducer';
import { toDict } from '@utils/convert';
import apiService from '@services/apiService';

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
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.chatRooms.pages[pageNumber] = [];
        },
        receivePage(state, { payload: { results, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            const getStatus = (status: string) => {
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

            const normalizedResults = results.map((item) => ({
                ...item,
                status: getStatus(item.status),
            }));
            const chatRooms = toDict<IChatRoom>(normalizedResults, 'id');

            state.chatRooms = chatRooms;
            state.pagination.chatRooms.count = count;
            state.pagination.chatRooms.currentPage = pageNumber;
            state.pagination.chatRooms.pages[pageNumber] = keys(chatRooms);
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
export const { setPage, receivePage, resetPagination, setPaginationRequestStatus } = chatRoomsSlice.actions;

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
            `${BACKEND_ROUTING.PROPOSAL.CHAT_ROOMS}?${getQueryParams(normalizedPageNumber)}`
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

// export const createProposalAsync = (proposalsData: Partial<{ [key in keyof IProposal]: string }>): AppThunk => async (
//     dispatch: AppDispatch
// ) => {
//     dispatch(setCreateProposalRequestStatus(RequestStatus.FETCHING));

//     try {
//         /**
//          * This method return new proposal object
//          */
//         await apiService.post(BACKEND_ROUTING.PROPOSAL.CREATE, proposalsData);

//         storeToast({
//             status: 'success',
//             title: 'Partnerstwo',
//             message: 'Partnerstwo zostało stworzone',
//         });

//         dispatch(setCreateProposalRequestStatus(RequestStatus.SUCCESS));
//     } catch (error) {
//         dispatch(setCreateProposalRequestStatus(RequestStatus.ERROR));
//         storeToast({
//             status: 'error',
//             title: 'Partnerstwo',
//             message: 'Nie udało się swtorzyć nowego partnerstwa',
//         });

//         console.error('Fetch proposal details error:', error);
//     }
//     setTimeout(() => dispatch(setCreateProposalRequestStatus(RequestStatus.IDLE)), 100);
// };

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

export default chatRoomsSlice.reducer;
