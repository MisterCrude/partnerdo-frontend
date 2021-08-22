import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/rootReducer';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';

export const getProposalsPageRequestStatusSelector = (state: RootState) =>
    state.proposal.pagination.proposals.requestStatus;

export const getProposalCountSelector = (state: RootState) => state.proposal.pagination.proposals.count;
export const getPagesAmountSelector = createSelector(getProposalCountSelector, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);

export const getCurrentPageNumberSelector = (state: RootState) => state.proposal.pagination.proposals.currentPage;
export const getPagesSelector = (state: RootState) => state.proposal.pagination.proposals.pages;
export const getProposalsSelector = (state: RootState) => state.proposal.proposals;
export const getCurrentPageProposalsSelector = createSelector(
    getCurrentPageNumberSelector,
    getPagesSelector,
    getProposalsSelector,
    (currentPageNumber, pages, proposals) =>
        pages[currentPageNumber] ? pages[currentPageNumber].map((id) => proposals[id]) : []
);

export const getDetailsRequestStatusSelector = (state: RootState) => state.proposal.details.requestStatus;
export const getDetailsDataSelector = (state: RootState) => state.proposal.details.data;

export const getCreateRequestStatusSelector = (state: RootState) => state.proposal.createProposalRequestStatus;
