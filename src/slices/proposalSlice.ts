import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { keys } from 'lodash/fp';
import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { getQueryParamsString, countOffset } from '@src/utils/pagination';
import { IFiltersData } from '@models/proposal';
import { IGenericRemote } from '@models/misc';
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

interface IPagination {
    count: number;
    currentPage: number;
    requestStatus: RequestStatus;
    pages: Record<number, string[]>;
}

export interface IProposalState {
    createProposalRequestStatus: RequestStatus;
    details: IGenericRemote<IProposal>;
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
    createProposalRequestStatus: RequestStatus.IDLE,
    details: {
        data: {} as IProposal,
        requestStatus: RequestStatus.IDLE,
    },
    proposals: {},
    pagination: {
        proposals: initialPaginationItem,
    },
};

export const getQueryParams = ({ age, pageNumber, city, categories, cityAreas, gender, search }: IFiltersData) =>
    getQueryParamsString({
        limit: String(PAGINATION_ITEMS_LIMIT),
        offset: String(countOffset(pageNumber || 1)),
        city: city || undefined,
        categories: categories.length ? categories.join(',') : undefined,
        city_areas: cityAreas.length ? cityAreas.join(',') : undefined,
        age: age.length ? age.join(',') : undefined,
        gender: gender.length === 1 ? gender[0] : undefined,
        search: search || undefined,
    });

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
        setDetailsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.details.requestStatus = payload;
        },
        setCreateProposalRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.createProposalRequestStatus = payload;
        },
        setPage(state, { payload: pageNumber }: PayloadAction<number>) {
            state.pagination.proposals.pages[pageNumber] = [];
        },
        setDetails(state, { payload: proposalDetails }: PayloadAction<IProposal>) {
            state.details.data = proposalDetails;
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
    setCreateProposalRequestStatus,
} = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync = (filtersData: IFiltersData): AppThunk => async (dispatch: AppDispatch) => {
    const isInitialFetch = !filtersData.pageNumber;
    if (isInitialFetch) dispatch(setPaginationRequestStatus(RequestStatus.FETCHING));

    try {
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
    dispatch(setDetailsRequestStatus(RequestStatus.FETCHING));

    try {
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

export const createProposalAsync = (proposalsData: Partial<{ [key in keyof IProposal]: string }>): AppThunk => async (
    dispatch: AppDispatch
) => {
    const setIdle = () => setTimeout(() => dispatch(setCreateProposalRequestStatus(RequestStatus.IDLE)), 100);
    dispatch(setCreateProposalRequestStatus(RequestStatus.FETCHING));

    try {
        /**
         * This method return new proposal object
         */
        await apiService.post(BACKEND_ROUTING.PROPOSAL.CREATE, proposalsData);

        storeToast({
            status: 'success',
            title: 'Partnerstwo',
            message: 'Partnerstwo zostało stworzone',
        });

        dispatch(setCreateProposalRequestStatus(RequestStatus.SUCCESS));
        setIdle();
    } catch (error) {
        dispatch(setCreateProposalRequestStatus(RequestStatus.ERROR));
        storeToast({
            status: 'error',
            title: 'Partnerstwo',
            message: 'Nie udało się swtorzyć nowego partnerstwa',
        });

        console.error('Fetch proposal details error:', error);
        setIdle();
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

export const getCreateRequestStatusSelector = (state: RootState) => state.proposal.createProposalRequestStatus;

export default proposalSlice.reducer;
