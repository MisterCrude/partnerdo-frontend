import { toDict } from '@utils/convert';
import { IUserProposal } from '@typing/user';
import { RootState } from '@store/rootReducer';

export const userSelector = (state: RootState) => state.user;
export const userProposalsSelector = (state: RootState) => toDict<IUserProposal>(state.user.proposals, 'id');
