import { RootState } from '@store/rootReducer';

export const isAuthSelector = (state: RootState) => state.profile.isAuth;
export const profileSelector = (state: RootState) => state.profile.userProfile.data;
export const profileProposalListSelector = (state: RootState) => state.profile.proposals.data;

/**
 * Request status
 */
export const profileRequestStatusSelector = (state: RootState) => state.profile.userProfile.requestStatus;
export const profileProposalListRequestStatusSelector = (state: RootState) => state.profile.proposals.requestStatus;
export const profileProposalListUpdateRequestStatusSelector = (state: RootState) =>
    state.profile.proposals.updateRequestStatus;
