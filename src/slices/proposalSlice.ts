import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { History } from 'history';
import { keys } from 'lodash/fp';

import { BACKEND_ROUTING } from '@config/api';
import { arrayToDict } from '@src/utils/misc';
// import { ROUTES } from '@config/app';
// import { IProposal, IPaginatedProposal } from '@models/proposal';
import { IProposal, IProposalResponse } from '@models/proposal';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
// import { RootState, storeToast } from '@store/rootReducer';

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
    // TODO move to utils
    const URLParams = (params: Record<string, string>) => new URLSearchParams(params);

    try {
        dispatch(setPage(pageNumber));
        // TODO move to some utils
        const queryParams = URLParams({ limit: '10', offset: `${pageNumber - 1}` });
        const {
            data: { results, count },
        }: { data: IProposalResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}?${queryParams.toString()}`
        );
        const dictData = arrayToDict<IProposal>(results, 'id');

        dispatch(receivePage({ proposals: dictData, count, pageNumber }));
    } catch (error) {
        resetPagination();
        console.error('Fetch proposals error:', error);
    }
};

export default proposalSlice.reducer;
