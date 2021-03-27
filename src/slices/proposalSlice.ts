import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { keys } from 'lodash/fp';

// import { History } from 'history';
// import { IProposal, IPaginatedProposal } from '@models/proposal';
// import { ROUTES } from '@consts/app';
import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { getQueryParams } from '@src/utils/pagination';
import { IFiltersData } from '@src/models/proposal';
import { IProposal, IProposalResponse } from '@models/proposal';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';

import { RequestStatus } from '@models/misc';
import { RootState, storeToast } from '@store/rootReducer';
import { toDict } from '@utils/convert';
import apiService from '@services/apiService';

interface INormalisedResponse {
    proposals: Record<string, IProposal>;
    count: number;
    pageNumber: number;
}

interface IPagination {
    count: number;
    currentPage: number;
    currentPageRequestStatus: RequestStatus;
    pages: Record<number, string[]>;
}

export interface IProposalState {
    pagination: {
        proposals: IPagination;
    };
    proposals: Record<string, IProposal>;
}

const initialPaginationItem: IPagination = {
    count: 0,
    currentPage: 1,
    currentPageRequestStatus: RequestStatus.IDLE,
    pages: {},
};

const initialState: IProposalState = {
    proposals: {},
    pagination: {
        proposals: initialPaginationItem,
    },
};

/**
 * Slice
 */
// TODO: split to paginate slice and proposal slice
const proposalSlice = createSlice({
    name: 'proposal',
    initialState,
    reducers: {
        setRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.pagination.proposals.currentPageRequestStatus = payload;
        },
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.proposals.pages[pageNumber] = [];
        },
        receivePage(state, { payload: { proposals, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            state.proposals = proposals;
            state.pagination.proposals.count = count;
            state.pagination.proposals.currentPage = pageNumber;
            state.pagination.proposals.pages[pageNumber] = keys(proposals);
        },
        resetPagination(state) {
            state.pagination.proposals = initialPaginationItem;
            state.proposals = {};
        },
    },
});

/**
 * Sync actions
 */
export const { setRequestStatus, setPage, receivePage, resetPagination } = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync = (filtersData: IFiltersData): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const isInitialFetch = !filtersData.pageNumber;
        if (isInitialFetch) dispatch(setRequestStatus(RequestStatus.FETCHING));

        dispatch(setPage(filtersData.pageNumber || 1));

        const {
            data: { results, count },
        }: { data: IProposalResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}?${getQueryParams(filtersData)}`
        );
        const proposalsDict = toDict<IProposal>(results, 'id');

        dispatch(receivePage({ proposals: proposalsDict, count, pageNumber: filtersData.pageNumber || 1 }));
        dispatch(setRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(resetPagination());
        dispatch(setRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: `Nie udało się pobrać partnerstwa`,
        });

        console.error('Fetch pagination page error:', error);
    }
};

/**
 * Selectors
 */
export const getRequestStatusSelector = (state: RootState) =>
    state.proposal.pagination.proposals.currentPageRequestStatus;

export const getProposalCountSelector = (state: RootState) => state.proposal.pagination.proposals.count;
export const getPagesAmountSelector = createSelector(getProposalCountSelector, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);

export const getCurrentPageSelector = (state: RootState) => state.proposal.pagination.proposals.currentPage;
export const getPagesSelector = (state: RootState) => state.proposal.pagination.proposals.pages;
export const getProposalsSelector = (state: RootState) => state.proposal.proposals;
export const getCurrentPageProposalsSelector = createSelector(
    getCurrentPageSelector,
    getPagesSelector,
    getProposalsSelector,
    (currentPage, pages, proposals) => (pages[currentPage] ? pages[currentPage].map((id) => proposals[id]) : [])
);

export default proposalSlice.reducer;
