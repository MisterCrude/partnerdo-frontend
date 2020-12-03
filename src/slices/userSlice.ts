import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';
import { compose, capitalize, set, unset } from 'lodash/fp';

import { BACKEND_ROUTING } from '@config/api';
import { ROUTES } from '@config/app';
import { IUserState, IUser, ITokenResponce, IUserResponce } from '@models/user';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { setAlert } from './alertSlice';

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
        startFetching(state) {
            state.fetching = true;
        },
        loginUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isAuth = true;
            state.fetching = false;
        },
        logoutUser(state) {
            state.data = {} as IUser;
            state.isAuth = false;
            state.fetching = false;
        },
        setUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.data = payload.user;
            state.isAuth = true;
            state.fetching = false;
        },
    },
});

/**
 * Sync actions
 */
export const { loginUser, logoutUser, setUser, startFetching } = userSlice.actions;

/**
 * Async actions
 */
interface IUserParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const loginUserAsync = ({ credentials, history }: IUserParams): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(startFetching());

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

        dispatch(loginUser({ user: normalizedUser }));
        dispatch(
            setAlert({
                status: 'success',
                title: 'Logowanie',
                message: `${capitalize(user.username)}, witamy w naszym serwisie ponownie`,
            })
        );
    } catch (error) {
        dispatch(
            setAlert({
                status: 'error',
                title: 'Logowanie',
                message: 'Coś poszło nie tak spróbuj ponownie',
            })
        );
    }
};

export const registerUserAsync = ({ credentials, history }: IUserParams): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(startFetching());

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

        dispatch(loginUser({ user: normalizedUser }));
        dispatch(
            setAlert({
                status: 'success',
                title: 'Rejestracja',
                message: `${capitalize(user.username)}, miło cię widzieć w naszym serwisie`,
            })
        );
    } catch (error) {
        dispatch(
            setAlert({
                status: 'error',
                title: 'Rejestracja',
                message: 'Kurde, rejestracja jebnęła',
            })
        );
    }
};

export const logoutUserAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.HOME);

    dispatch(logoutUser());

    dispatch(
        setAlert({
            status: 'success',
            title: 'Wylogowanie',
            message: 'Do zobaczenia',
        })
    );
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;
export const getIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
