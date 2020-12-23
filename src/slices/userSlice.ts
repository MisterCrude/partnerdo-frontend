import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';
import { compose, capitalize, set, unset } from 'lodash/fp';

import { BACKEND_ROUTING } from '@config/api';
import { ROUTES } from '@config/app';
import { IUserState, IUser, ITokenResponce, IUserResponce } from '@models/user';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState, storeToast } from '@store/rootReducer';

const initialState: IUserState = {
    isAuth: !!localStorage.getItem('token') ?? false,
    data: {} as IUser,
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
            state.data = {} as IUser;
            state.isAuth = false;
        },
        setUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isAuth = true;
        },
    },
});

/**
 * Sync actions
 */
export const { setUser, removeUser, setFetching } = userSlice.actions;

/**
 * Async actions
 */
interface IUserParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const loginUserAsync = ({ credentials, history }: IUserParams): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

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

        localStorage.setItem('token', token.key);
        history.push(ROUTES.BROWSER);

        dispatch(setUser({ user: normalizedUser }));
        storeToast({
            status: 'success',
            title: 'Logowanie',
            message: `${capitalize(user.username)}, witamy w naszym serwisie ponownie`,
        });
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak spróbuj ponownie',
        });
    }

    dispatch(setFetching(false));
};

export const registerUserAsync = ({ credentials, history }: IUserParams): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        const { data: token }: { data: ITokenResponce } = await apiService.post(
            BACKEND_ROUTING.AUTH.REGISTER,
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

        dispatch(setUser({ user: normalizedUser }));

        storeToast({
            status: 'success',
            title: 'Rejestracja',
            message: `${capitalize(user.username)}, witamy Cię po raz pierwszy w naszym serwisie`,
        });
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Rejestracja',
            message: 'Kurde, rejestracja jebnęła',
        });
    }

    dispatch(setFetching(false));
};

export const logoutUserAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.HOME);

    dispatch(removeUser());

    // storeToast({
    //     status: 'success',
    //     title: 'Wylogowanie',
    //     message: 'Do zobaczenia',
    // });
};

export const fetchUserAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        const { data: user }: { data: IUserResponce } = await apiService.get(BACKEND_ROUTING.AUTH.USER);
        const normalizedUser = compose(unset('pk'), set('id', user.pk))(user);

        dispatch(setUser({ user: normalizedUser }));
    } catch (error) {
        localStorage.removeItem('token');

        dispatch(removeUser());

        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak, wyjebało Cię z tej wspaniałej apki',
        });
    }

    dispatch(setFetching(false));
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getIsFetching = (state: RootState) => state.user.fetching;

export default userSlice.reducer;
