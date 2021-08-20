import { RootState } from '@store/rootReducer';

export const getIsAuthSelector = (state: RootState) => state.profile.isAuth;
export const getProfileDataSelector = (state: RootState) => state.profile.userProfile.data;
export const getProfileRequestStatusSelector = (state: RootState) => state.profile.userProfile.requestStatus;
export const getProfileProposalsSelector = (state: RootState) => state.profile.proposals.data;
export const getProfileProposalsRequestStatusSelector = (state: RootState) => state.profile.proposals.requestStatus;
export const getProfileProposalsUpdateRequestStatusSelector = (state: RootState) =>
    state.profile.proposals.updateRequestStatus;
