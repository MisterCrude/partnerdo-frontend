import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
// import { History } from 'history';
import { keys } from 'lodash/fp';

// import { IProposal, IPaginatedProposal } from '@models/proposal';
// import { ROUTES } from '@consts/app';
import { AppThunk, AppDispatch } from '@store/index';
import { arrayToDict } from '@src/utils/misc';
import { BACKEND_ROUTING } from '@consts/api';
import { getQueryParams, countOffset } from '@src/utils/pagination';
import { IProposal, IProposalResponse } from '@models/proposal';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { RootState, storeToast } from '@store/rootReducer';
import apiService from '@services/apiService';

interface IPage {
    fetching: boolean;
    ids: string[];
}

interface IPagination {
    count: number;
    currentPage: number;
    pages: Record<number, IPage>;
}

interface INormalisedResponse {
    proposals: Record<string, IProposal>;
    count: number;
    pageNumber: number;
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
    pages: { 1: { fetching: false, ids: [] } },
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
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.proposals.pages[pageNumber] = { ids: [], fetching: true };
        },
        receivePage(state, { payload: { proposals, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            state.proposals = proposals;
            state.pagination.proposals.count = count;
            state.pagination.proposals.currentPage = pageNumber;
            state.pagination.proposals.pages[pageNumber] = {
                ids: keys(proposals),
                fetching: false,
            };
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
export const { setPage, receivePage, resetPagination } = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync = (pageNumber: number): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPage(pageNumber));

        const queryParams = getQueryParams({
            limit: String(PAGINATION_ITEMS_LIMIT),
            offset: String(countOffset(pageNumber)),
            // category: ['d9a35511-4566-467c-91f5-5edc57e62df4', 'cb29f60a-de07-4a27-9209-ff74e0564a05'].join(','),
            city: 'f8fc89492-e5d4-4572-9a26-2aa17dd036fc',
            // city_areas: ['04723601-f533-44f1-b9bc-44cf5b516ac1', '9a890976-5278-4523-b8f0-95255585481f'].join(','),
            // age: [20, 30].join(','),
            gender: 'm',
        });

        const {
            data: { results, count },
        }: { data: IProposalResponse } = await apiService.get(`${BACKEND_ROUTING.PROPOSAL.LIST}?${queryParams}`);
        const proposalsDict = arrayToDict<IProposal>(results, 'id');

        dispatch(receivePage({ proposals: proposalsDict, count, pageNumber }));
    } catch (error) {
        dispatch(resetPagination());

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
export const getProposalCountSelect = (state: RootState) => state.proposal.pagination.proposals.count;
export const getProposalCurrentPageSelect = (state: RootState) => state.proposal.pagination.proposals.currentPage;
export const getProposalPagesSelect = (state: RootState) => state.proposal.pagination.proposals.pages;
export const getProposalProposalsSelect = (state: RootState) => state.proposal.proposals;
export const getPaginationPagesAmountSelect = createSelector(getProposalCountSelect, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);
export const getPaginationCurrentPageItems = createSelector(
    getProposalCurrentPageSelect,
    getProposalPagesSelect,
    getProposalProposalsSelect,
    (currentPage, pages, proposals) => {
        return {
            fetching: pages[currentPage].fetching,
            proposals: pages[currentPage].ids.map((id) => proposals[id]),
        };
    }
);

export default proposalSlice.reducer;
