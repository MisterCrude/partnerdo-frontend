import { AppThunk, AppDispatch } from '@store/index';
import { toDict } from '@utils/convert';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserResponse, IUserData, IUserProposal } from '@models/user';
import { omit } from 'lodash/fp';
import { RequestStatus } from '@models/api';
import { RootState, storeToast } from '@store/rootReducer';
import apiService from '@services/apiService';

export interface IUserState extends IUser {
    requestStatus: RequestStatus;
}

const initialState: IUserState = {
    data: {} as IUserData,
    proposals: [],
    requestStatus: RequestStatus.IDLE,
};

/**
 * Slice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.requestStatus = payload;
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
export const { removeUser, setUser, setRequestStatus } = userSlice.actions;

/**
 * Async actions
 */
export const fetchUserAsync = (userId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: userData }: { data: IUserResponse } = await apiService.get(`${BACKEND_ROUTING.USER}${userId}`);

        const proposals = userData.proposals;
        const data = omit(['proposals'], userData);

        dispatch(setUser({ data, proposals }));
        dispatch(setRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profile uzytkownika',
            message: 'Nie udało się pobrać dane tego uzytkownika',
        });
        console.error('User error:', error);
        dispatch(removeUser());
        dispatch(setRequestStatus(RequestStatus.ERROR));
    }
};

/**
 * Selectors
 */
export const getUserSelector = (state: RootState) => state.user;
export const getUserProposalsSelector = (state: RootState) => toDict<IUserProposal>(state.user.proposals, 'id');

export default userSlice.reducer;
