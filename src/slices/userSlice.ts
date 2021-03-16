import { AppThunk, AppDispatch } from '@store/index';
import { arrayToDict } from '@src/utils/misc';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { History } from 'history';
import { IUser, IUserResponse, IUserData, IUserProposal } from '@models/user';
import { omit } from 'lodash/fp';
import { RootState, storeToast } from '@store/rootReducer';
import apiService from '@services/apiService';

export interface IUserState extends IUser {
    fetching: boolean;
}

const initialState: IUserState = {
    data: {} as IUserData,
    proposals: [],
    fetching: false,
};

/**
 * Slice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFetching(state, { payload: isFetching }: PayloadAction<boolean>) {
            state.fetching = isFetching;
        },
        removeUser(state) {
            state.data = {} as IUserData;
            state.proposals = [];
        },
        setUser(state, { payload: { proposals, data } }: PayloadAction<IUser>) {
            state.data = data;
            state.proposals = proposals;
        },
    },
});

/**
 * Sync actions
 */
export const { removeUser, setUser, setFetching } = userSlice.actions;

/**
 * Async actions
 */
export const fetchUserAsync = (userId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        const { data: userData }: { data: IUserResponse } = await apiService.get(`${BACKEND_ROUTING.USER}${userId}`);

        const proposals = userData.proposals;
        const data = omit(['proposals'], userData);

        dispatch(setUser({ data, proposals }));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profile uzytkownika',
            message: 'Nie udało się pobrać dane tego uzytkownika',
        });
        console.error('User error:', error);
    }

    dispatch(setFetching(false));
};

/**
 * Selectors
 */
export const getUserSelector = (state: RootState) => state.user;
export const getUserProposalsSelector = (state: RootState) => arrayToDict<IUserProposal>(state.user.proposals, 'id');
export const getUserProposalSelector = createSelector(getUserProposalsSelector, (proposals) => (proposalId: string) =>
    proposals[proposalId]
);

export default userSlice.reducer;
