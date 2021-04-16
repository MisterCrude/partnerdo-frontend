import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { keys } from 'lodash/fp';

// import { History } from 'history';
// import { IProposal, IPaginatedProposal } from '@models/proposal';
// import { ROUTES } from '@consts/app';
import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { getQueryParams } from '@src/utils/pagination';
import { IFiltersData } from '@src/models/proposal';
import { IProposal, IProposalsListResponse, IProposalResponse } from '@models/proposal';
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

interface IDetails {
    data: IProposal;
    requestStatus: RequestStatus;
}

interface IPagination {
    count: number;
    currentPage: number;
    requestStatus: RequestStatus;
    pages: Record<number, string[]>;
}

export interface IProposalState {
    details: IDetails;
    pagination: {
        proposals: IPagination;
    };
    proposals: Record<string, IProposal>;
}

const initialPaginationItem: IPagination = {
    count: 0,
    currentPage: 1,
    requestStatus: RequestStatus.IDLE,
    pages: {},
};

const initialState: IProposalState = {
    details: {
        data: {} as IProposal,
        requestStatus: RequestStatus.IDLE,
    },
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
        setPaginationRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.pagination.proposals.requestStatus = payload;
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
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        setDetails(state, { payload: proposalDetails }: PayloadAction<IProposal>) {
            state.details.data = proposalDetails;
        },
        resetDetails(state) {
            state.details.data = {} as IProposal;
            state.details.requestStatus = RequestStatus.IDLE;
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
} = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync = (filtersData: IFiltersData): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const isInitialFetch = !filtersData.pageNumber;
        if (isInitialFetch) dispatch(setPaginationRequestStatus(RequestStatus.FETCHING));

        dispatch(setPage(filtersData.pageNumber || 1));

        const {
            data: { results, count },
        }: { data: IProposalsListResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}?${getQueryParams(filtersData)}`
        );
        const proposalsDict = toDict<IProposal>(results, 'id');

        dispatch(receivePage({ proposals: proposalsDict, count, pageNumber: filtersData.pageNumber || 1 }));
        dispatch(setPaginationRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        dispatch(resetPagination());
        dispatch(setPaginationRequestStatus(RequestStatus.ERROR));

        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: `Nie udało się pobrać partnerstwa`,
        });

        console.error('Fetch pagination page error:', error);
    }
};

export const fetchDetailsAsync = (proposalId: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setDetailsRequestStatus(RequestStatus.FETCHING));

        const { data: proposalDetails }: { data: IProposalResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}${proposalId}`
        );

        dispatch(setDetails(proposalDetails));
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

/**
 * Selectors
 */
export const getProposalsPageRequestStatusSelector = (state: RootState) =>
    state.proposal.pagination.proposals.requestStatus;

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

export const getDetailsRequestStatusSelector = (state: RootState) => state.proposal.details.requestStatus;
export const getDetailsData = (state: RootState) => state.proposal.details.data;

export default proposalSlice.reducer;
