import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/rootReducer';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';

export const proposalCountSelector = (state: RootState) => state.proposal.pagination.proposals.count;
export const getPagesAmountSelector = createSelector(proposalCountSelector, (count) =>
    Math.ceil(count / PAGINATION_ITEMS_LIMIT)
);
export const currentPageNumberSelector = (state: RootState) => state.proposal.pagination.proposals.currentPage;
export const proposalPageListSelector = (state: RootState) => state.proposal.pagination.proposals.pages;
export const proposalListSelector = (state: RootState) => state.proposal.proposals;
export const currentPageProposalListSelector = createSelector(
    currentPageNumberSelector,
    proposalPageListSelector,
    proposalListSelector,
    (currentPageNumber, pages, proposals) =>
        pages[currentPageNumber] ? pages[currentPageNumber].map((id) => proposals[id]) : []
);
export const proposalDetailsSelector = (state: RootState) => state.proposal.details.data;

/**
 * Request status
 */
export const proposalListRequestStatusSelector = (state: RootState) =>
    state.proposal.pagination.proposals.requestStatus;
export const proposalDetailsRequestStatusSelector = (state: RootState) => state.proposal.details.requestStatus;
export const proposalCreateRequestStatusSelector = (state: RootState) => state.proposal.createProposalRequestStatus;
