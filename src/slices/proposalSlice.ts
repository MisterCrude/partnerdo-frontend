import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
// import { History } from 'history';
import { keys } from 'lodash/fp';

// import { IProposal, IPaginatedProposal } from '@models/proposal';
// import { ROUTES } from '@consts/app';
import { AppThunk, AppDispatch } from '@store/index';
import { arrayToDict, URLParams } from '@src/utils/misc';
import { BACKEND_ROUTING } from '@consts/api';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { IProposal, IProposalResponse } from '@models/proposal';
import { RootState } from '@store/rootReducer';
import apiService from '@services/apiService';

interface IPage {
    fetching: boolean;
    ids: string[];
}

interface IPaginationItem {
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
        proposals: IPaginationItem;
    };
    proposals: Record<string, IProposal>;
}

const initialPaginationItem: IPaginationItem = {
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
        const countOffset = (pageNumber: number) => (pageNumber - 1) * PAGINATION_ITEMS_LIMIT;

        dispatch(setPage(pageNumber));
        // TODO move ALL request to separate cervice file????
        const queryParams = URLParams({
            limit: String(PAGINATION_ITEMS_LIMIT),
            offset: String(countOffset(pageNumber)),
        });
        const {
            data: { results, count },
        }: { data: IProposalResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}?${queryParams.toString()}`
        );
        const dictData = arrayToDict<IProposal>(results, 'id');

        dispatch(receivePage({ proposals: dictData, count, pageNumber }));
    } catch (error) {
        resetPagination();
        // TODO show toast with error
        console.error('Fetch proposals error:', error);
    }
};

/**
 * Selectors
 */
// TODO refactor
export const getPaginationCountSelect = (state: RootState) => state.pagination.pagination.proposals.count;
export const getPaginationCurrentPageSelect = (state: RootState) => state.pagination.pagination.proposals.currentPage;
export const getPaginationPagesSelect = (state: RootState) => state.pagination.pagination.proposals.pages;
export const getPaginationProposalsSelect = (state: RootState) => state.pagination.proposals;
export const getPaginationPagesAmountSelect = createSelector(getPaginationCountSelect, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);
export const getPaginationCurrentPageItems = createSelector(
    getPaginationCurrentPageSelect,
    getPaginationPagesSelect,
    getPaginationProposalsSelect,
    (currentPage, pages, proposals) => {
        return {
            fetching: pages[currentPage].fetching,
            proposals: pages[currentPage].ids.map((id) => proposals[id]),
        };
    }
);

export default proposalSlice.reducer;
