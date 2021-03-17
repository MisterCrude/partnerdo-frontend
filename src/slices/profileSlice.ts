import { AppThunk, AppDispatch } from '@store/index';
import { BACKEND_ROUTING } from '@consts/api';
import { capitalize } from 'lodash/fp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';
import { IProfile, IAuthTokenResponse, IProfileResponse } from '@models/profile';
import { RequestStatus } from '@models/misc';
import { RootState, storeToast } from '@store/rootReducer';
import { ROUTES } from '@consts/routes';
import apiService from '@services/apiService';

export interface IProfileState {
    data: IProfile;
    isAuth: boolean;
    requestStatus: RequestStatus;
}

const initialState: IProfileState = {
    data: {} as IProfile,
    isAuth: !!localStorage.getItem('token') ?? false,
    requestStatus: RequestStatus.IDLE,
};

/**
 * Slice
 */
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setRequestStatu(state, { payload }: PayloadAction<RequestStatus>) {
            state.requestStatus = payload;
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
export const { setProfile, removeProfile, setRequestStatu } = profileSlice.actions;

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
    dispatch(setRequestStatu(RequestStatus.FETCHING));

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
        dispatch(setRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak spróbuj ponownie',
        });
        console.error('Login error:', error);

        dispatch(removeProfile());
        dispatch(setRequestStatu(RequestStatus.ERROR));
    }
};

export const registerProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setRequestStatu(RequestStatus.FETCHING));

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
        dispatch(setRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Rejestracja',
            message: 'Kurde, rejestracja jebnęła',
        });

        dispatch(removeProfile());
        dispatch(setRequestStatu(RequestStatus.ERROR));
    }
};

export const logoutProfileAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.ROOT);

    dispatch(removeProfile());
};

export const fetchProfileAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setRequestStatu(RequestStatus.FETCHING));

    try {
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE);

        dispatch(setProfile(profileData));
        dispatch(setRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        localStorage.removeItem('token');

        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak, wyjebało Cię z tej wspaniałej apki',
        });

        dispatch(removeProfile());
        dispatch(setRequestStatu(RequestStatus.ERROR));
    }
};

/**
 * Selectors
 */
export const getProfileDataSelector = (state: RootState) => state.profile.data;
export const getIsAuthSelector = (state: RootState) => state.profile.isAuth;
export const getRequestStatusSelector = (state: RootState) => state.profile.requestStatus;

export default profileSlice.reducer;
