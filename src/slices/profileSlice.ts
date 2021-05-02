import { AppThunk, AppDispatch } from '@store/index';
import { AvatarState } from '@screens/Profile//components/AvatarInput';
import { BACKEND_ROUTING } from '@consts/api';
import { capitalize, omit, get } from 'lodash/fp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueryParamsString } from '@src/utils/pagination';
import { History } from 'history';
import { IInputs } from '@screens/Login/components/LoginForm';
import { IInputs as IProfileInputs } from '@screens/Profile/components/EditForm';
import { IProfile, IAuthTokenResponse, IProfileResponse } from '@models/profile';
import { IGenericRemote } from '@models/misc';
import { IProposalsListResponse, IProposal } from '@models/proposal';
import { RequestStatus } from '@models/misc';
import { RootState, storeToast } from '@store/rootReducer';
import { ROUTES } from '@consts/routes';
import apiService from '@services/apiService';

export interface IProfileState {
    isAuth: boolean;
    userProfile: IGenericRemote<IProfile>;
    proposals: IGenericRemote<IProposal[]>;
    history: IGenericRemote<any>;
}

const initialState: IProfileState = {
    isAuth: !!localStorage.getItem('token') ?? false,
    userProfile: {
        data: {} as IProfile,
        requestStatus: RequestStatus.IDLE,
    },
    proposals: {
        data: [] as IProposal[],
        requestStatus: RequestStatus.IDLE,
    },
    history: {} as IGenericRemote<any>,
};

/**
 * Slice
 */
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        /**
         *  Profile
         */
        // TODO fix
        setProfileRequestStatu(state, { payload }: PayloadAction<RequestStatus>) {
            state.userProfile.requestStatus = payload;
        },
        removeProfile(state) {
            state.userProfile.data = {} as IProfile;
            state.isAuth = false;
        },
        setProfile(state, { payload: profileData }: PayloadAction<IProfile>) {
            state.userProfile.data = profileData;
            state.isAuth = true;
        },
        /**
         *  ProfileProposal
         */
        setProfileProposalsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.proposals.requestStatus = payload;
        },
        setProfileProposals(state, { payload: proposals }: PayloadAction<IProposal[]>) {
            state.proposals.data = proposals;
        },
        removeProfileProposals(state) {
            state.proposals.data = [] as IProposal[];
        },
        removeOneProfileProposal(state, { payload: proposalId }: PayloadAction<string>) {
            state.proposals.data = state.proposals.data.filter((proposal: IProposal) => proposal.id !== proposalId);
        },
    },
});

/**
 * Sync actions
 */
export const {
    setProfile,
    removeProfile,
    setProfileRequestStatu,
    setProfileProposalsRequestStatus,
    setProfileProposals,
    removeProfileProposals,
    removeOneProfileProposal,
} = profileSlice.actions;

/**
 * Async actions
 */
interface IProfileParams {
    credentials: IInputs;
    history: History;
}

export const loginProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setProfileRequestStatu(RequestStatus.FETCHING));

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
        dispatch(setProfileRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak spróbuj ponownie',
        });
        console.error('Login error:', error);

        dispatch(removeProfile());
        dispatch(setProfileRequestStatu(RequestStatus.ERROR));
    }
};

export const registerProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setProfileRequestStatu(RequestStatus.FETCHING));

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
        dispatch(setProfileRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Rejestracja',
            message: 'Kurde, rejestracja jebnęła',
        });

        dispatch(removeProfile());
        dispatch(setProfileRequestStatu(RequestStatus.ERROR));
    }
};

export const logoutProfileAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.ROOT);

    dispatch(removeProfile());
};

export const fetchProfileAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setProfileRequestStatu(RequestStatus.FETCHING));

    try {
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE);

        dispatch(setProfile(profileData));
        dispatch(setProfileRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        localStorage.removeItem('token');

        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak, nie udało się pobrać danie twojego profilu',
        });

        dispatch(removeProfile());
        dispatch(setProfileRequestStatu(RequestStatus.ERROR));
    }
};

export const fetchProfileProposalsAsync = (authorId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setProfileProposalsRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: profileProposalsPagination }: { data: IProposalsListResponse } = await apiService.get(
            `${BACKEND_ROUTING.PROPOSAL.LIST}?${getQueryParamsString({ author: authorId })}`
        );

        const profileProposals = profileProposalsPagination['results'];

        dispatch(setProfileProposals(profileProposals));
        dispatch(setProfileProposalsRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profil',
            message: 'Nie udało się pobrać twoich partnerstw',
        });
        dispatch(removeProfileProposals());
        dispatch(setProfileProposalsRequestStatus(RequestStatus.ERROR));
    }
};

export const updateProfileAsync = (updatedData: IProfileInputs): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setProfileRequestStatu(RequestStatus.FETCHING));

    const avatar = get(['avatar'], updatedData);
    const normalizedUpdatedData = omit(['avatar'], updatedData);

    try {
        if (avatar?.state === AvatarState.ADDED) {
            await apiService.post(BACKEND_ROUTING.AUTH.PROFILE_AVATAR, {
                image: avatar.file,
            });
        }

        if (avatar?.state === AvatarState.DELETED) {
            await apiService.delete(BACKEND_ROUTING.AUTH.PROFILE_AVATAR);
        }

        const { data: profileData }: { data: IProfileResponse } = await apiService.patch(BACKEND_ROUTING.AUTH.PROFILE, {
            ...normalizedUpdatedData,
        });

        /**
         * Get MyProposals list after changing profile data
         */
        dispatch(fetchProfileProposalsAsync(profileData.id));
        dispatch(setProfile(profileData));
        storeToast({
            status: 'success',
            title: 'Profil uzytkownika',
            message: 'Dane zostały zapisane',
        });
        dispatch(setProfileRequestStatu(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profil uzytkownika',
            message: 'Nie udało się zapisać dane',
        });

        dispatch(setProfileRequestStatu(RequestStatus.ERROR));
    }
};

export interface IProposalRemove {
    id: string;
    name: string;
}

export const removeProfileProposalAsync = ({ id, name }: IProposalRemove): AppThunk => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(removeOneProfileProposal(id));
        await apiService.delete(`${BACKEND_ROUTING.PROPOSAL.LIST}${id}`);

        storeToast({
            status: 'success',
            title: 'Profil',
            message: `Partnerstwo "${name}" zostało usunięte`,
        });
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profil',
            message: `Nie udało się usunąć "${name}" partnerstwo`,
        });

        console.error('Delete proposal error:', error);
    }
};

/**
 * Selectors
 */
export const getIsAuthSelector = (state: RootState) => state.profile.isAuth;
export const getProfileDataSelector = (state: RootState) => state.profile.userProfile.data;
export const getProfileRequestStatusSelector = (state: RootState) => state.profile.userProfile.requestStatus;

export const getProfileProposalsDataSelector = (state: RootState) => state.profile.proposals.data;
export const getProfileProposalsRequestStatusSelector = (state: RootState) => state.profile.proposals.requestStatus;

export default profileSlice.reducer;
