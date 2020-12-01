import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';
import { compose, set, unset } from 'lodash/fp';

import { BACKEND_ROUTING } from '@config/api';
import { ROUTES } from '@config/app';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { IUserState, IUser, ITokenResponce, IUserResponce } from '@models/user';

const initialState: IUserState = {
    isAuth: !!localStorage.getItem('token') ?? false,
    data: {} as IUser,
    fetching: false,
    error: '',
};

/**
 * Slice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startFetching(state) {
            state.fetching = true;
            state.error = '';
        },
        loginUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isAuth = true;
            state.fetching = false;
            state.error = '';
        },
        logoutUser(state) {
            state.data = {} as IUser;
            state.isAuth = false;
            state.fetching = false;
            state.error = '';
        },
        setUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isAuth = true;
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
export const { loginUser, logoutUser, setUser, setError, startFetching } = userSlice.actions;

/**
 * Async actions
 */
interface loginUserParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const loginUserAsync = ({ credentials, history }: loginUserParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(startFetching());

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

        localStorage.setItem('token', token.key);
        history.push(ROUTES.BROWSER);

        dispatch(loginUser({ user: normalizedUser }));
    } catch (error) {
        console.error(error);
        dispatch(setError({ error: 'Coś poszło nie tak spróbuj ponownie' }));
    }
};

export const logoutUserAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.HOME);

    dispatch(logoutUser());
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;
export const getIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
