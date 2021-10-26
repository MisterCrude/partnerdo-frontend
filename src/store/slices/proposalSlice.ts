import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueryParamsString, countOffset } from '@src/utils/pagination';
import { IFilterData, IProposal, IProposalResponse } from '@typing/proposal';
import { IPaginationResponse, RequestStatus, IGenericRemote } from '@typing/api';
import { keys } from 'lodash/fp';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { storeToast } from '@store/rootReducer';
import { toDict } from '@utils/convert';
import apiService from '@services/apiService';

interface INormalisedResponse {
    results: IProposalResponse[];
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

export const getQueryParams = ({ age, pageNumber, city, categories, cityAreas, gender, search }: IFilterData) =>
    getQueryParamsString({
        limit: String(PAGINATION_ITEMS_LIMIT),
        offset: String(countOffset(pageNumber || 1, PAGINATION_ITEMS_LIMIT)),
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
        receivePage(state, { payload: { results, count, pageNumber } }: PayloadAction<INormalisedResponse>) {
            const proposals = toDict<IProposal>(results, 'id');

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
    setCreateProposalRequestStatus,
    setDetails,
    setDetailsRequestStatus,
    setPage,
    setPaginationRequestStatus,
} = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchPageAsync =
    (filtersData: IFilterData): AppThunk =>
    async (dispatch: AppDispatch) => {
        const isInitialFetch = !filtersData.pageNumber;
        if (isInitialFetch) dispatch(setPaginationRequestStatus(RequestStatus.FETCHING));

        try {
            dispatch(setPage(filtersData.pageNumber || 1));

            const {
                data: { results, count },
            }: { data: IPaginationResponse<IProposal> } = await apiService.get(
                `${BACKEND_ROUTING.PROPOSAL.LIST}?${getQueryParams(filtersData)}`
            );

            dispatch(receivePage({ results, count, pageNumber: filtersData.pageNumber || 1 }));
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

export const fetchDetailsAsync =
    (proposalId: string): AppThunk =>
    async (dispatch: AppDispatch) => {
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

export const createProposalAsync =
    (proposalsData: Partial<{ [key in keyof IProposal]: string }>): AppThunk =>
    async (dispatch: AppDispatch) => {
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
        } catch (error) {
            dispatch(setCreateProposalRequestStatus(RequestStatus.ERROR));
            storeToast({
                status: 'error',
                title: 'Partnerstwo',
                message: 'Nie udało się swtorzyć nowego partnerstwa',
            });

            console.error('Fetch proposal details error:', error);
        }
        setTimeout(() => dispatch(setCreateProposalRequestStatus(RequestStatus.IDLE)), 100);
    };

export default proposalSlice.reducer;
