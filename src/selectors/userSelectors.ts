import { toDict } from '@utils/convert';
import { IUserProposal } from '@typing/user';
import { RootState } from '@store/rootReducer';

export const getUserSelector = (state: RootState) => state.user;
export const getUserProposalsSelector = (state: RootState) => toDict<IUserProposal>(state.user.proposals, 'id');
