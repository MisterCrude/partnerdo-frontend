import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';
import { capitalize } from 'lodash/fp';

import { BACKEND_ROUTING } from '@consts/api';
import { ROUTES } from '@consts/routes';
import { IProfile, IAuthTokenResponse, IProfileResponse } from '@models/profile';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState, storeToast } from '@store/rootReducer';

export interface IProfileState {
    data: IProfile;
    fetching: boolean;
    isAuth: boolean;
}

const initialState: IProfileState = {
    isAuth: !!localStorage.getItem('token') ?? false,
    data: {} as IProfile,
    fetching: false,
};

/**
 * Slice
 */
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setFetching(state, { payload: isFetching }: PayloadAction<boolean>) {
            state.fetching = isFetching;
        },
        removeProfile(state) {
            state.data = {} as IProfile;
            state.isAuth = false;
        },
        setProfile(state, { payload: profileData }: PayloadAction<IProfile>) {
            state.data = profileData;
            state.isAuth = true;
        },
    },
});

/**
 * Sync actions
 */
export const { setProfile, removeProfile, setFetching } = profileSlice.actions;

/**
 * Async actions
 */
interface IProfileParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const loginProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setFetching(true));

    try {
        const { data: token }: { data: IAuthTokenResponse } = await apiService.post(
            BACKEND_ROUTING.AUTH.LOGIN,
            credentials
        );
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE, {
            headers: {
                Authorization: `token ${token.key}`,
            },
        });

        localStorage.setItem('token', token.key);
        history.push(ROUTES.PROPOSALS);

        dispatch(setProfile(profileData));
        storeToast({
            status: 'success',
            title: 'Logowanie',
            message: `${capitalize(profileData.username)}, witamy w naszym serwisie ponownie`,
        });
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak spróbuj ponownie',
        });
        console.error('Login error:', error);
    }

    dispatch(setFetching(false));
};

export const registerProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setFetching(true));

    try {
        const { data: token }: { data: IAuthTokenResponse } = await apiService.post(
            BACKEND_ROUTING.AUTH.REGISTER,
            credentials
        );
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE, {
            headers: {
                Authorization: `token ${token.key}`,
            },
        });

        localStorage.setItem('token', token.key);
        history.push(ROUTES.PROPOSALS);

        dispatch(setProfile(profileData));

        storeToast({
            status: 'success',
            title: 'Rejestracja',
            message: `${capitalize(profileData.username)}, witamy Cię po raz pierwszy w naszym serwisie`,
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

export const logoutProfileAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.ROOT);

    dispatch(removeProfile());

    // storeToast({
    //     status: 'success',
    //     title: 'Wylogowanie',
    //     message: 'Do zobaczenia',
    // });
};

export const fetchProfileAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE);

        dispatch(setProfile(profileData));
    } catch (error) {
        localStorage.removeItem('token');

        dispatch(removeProfile());

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
export const getProfileDataSelector = (state: RootState) => state.profile.data;
export const getIsAuthSelector = (state: RootState) => state.profile.isAuth;
export const getIsFetchingSelector = (state: RootState) => state.profile.fetching;

export default profileSlice.reducer;
