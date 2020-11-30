import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compose, set, unset } from 'lodash/fp';
import { BACKEND_ROUTING } from '@config/api';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { IUserState, IUser, ILoginResponce, IUserResponce } from '@models/user';

const initialState: IUserState = {
    isLogged: !!localStorage.getItem('token') ?? false,
    data: {} as IUser,
    fetching: true,
    error: '',
};

/**
 * Slice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokenUser(state, { payload }: PayloadAction<{ token: ILoginResponce; user: IUser }>) {
            localStorage.setItem('token', payload.token.key);

            state.data = payload.user;
            state.isLogged = true;
            state.fetching = false;
            state.error = '';
        },
        setUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isLogged = true;
            state.fetching = false;
            state.error = '';
        },
        setError(state, { payload }: PayloadAction<{ error: string }>) {
            state.data = {} as IUser;
            state.fetching = false;
            state.error = payload.error;
        },
    },
});

/**
 * Sync actions
 */
export const { setTokenUser, setUser, setError } = userSlice.actions;

/**
 * Async actions
 */
export const loginUserAsync = (credentials: Record<string, unknown>): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const token: ILoginResponce = await apiService.post(BACKEND_ROUTING.AUTH.LOGIN, credentials);
        const user: IUserResponce = await apiService.get(BACKEND_ROUTING.AUTH.USER);
        const normalizedUser = compose(unset('pk'), set('id', user.pk))(user);

        dispatch(setTokenUser({ token, user: normalizedUser }));
    } catch (error) {
        dispatch(setError({ error: 'Coś poszło nie tak spróbuj ponownie' }));
    }
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;
export const getIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
