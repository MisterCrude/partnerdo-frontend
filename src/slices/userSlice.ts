import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compose, set, unset } from 'lodash/fp';
import { BACKEND_ROUTING } from '@config/api';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { IUserState, IUser, ITokenResponce, IUserResponce } from '@models/user';

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
        loginUser(state, { payload }: PayloadAction<{ token: ITokenResponce; user: IUser }>) {
            localStorage.setItem('token', payload.token.key);

            state.data = payload.user;
            state.isLogged = true;
            state.fetching = false;
            state.error = '';
        },
        logoutUser(state) {
            localStorage.removeItem('token');

            state.data = {} as IUser;
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
export const { loginUser, logoutUser, setUser, setError } = userSlice.actions;

/**
 * Async actions
 */
export const loginUserAsync = (credentials: Record<string, unknown>): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const { data: token }: { data: ITokenResponce } = await apiService.post(
            BACKEND_ROUTING.AUTH.LOGIN,
            credentials
        );
        const { data: user }: { data: IUserResponce } = await apiService.get(BACKEND_ROUTING.AUTH.USER, {
            headers: {
                Authorization: `token ${token.key}`,
            },
        });
        const normalizedUser = compose(unset('pk'), set('id', user.pk))(user);

        dispatch(loginUser({ token, user: normalizedUser }));
    } catch (error) {
        console.error(error);
        dispatch(setError({ error: 'Coś poszło nie tak spróbuj ponownie' }));
    }
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;
export const getIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
