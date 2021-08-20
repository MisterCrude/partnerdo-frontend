import { AppThunk, AppDispatch } from '@store/index';
import { AvatarState } from '@screens/Profile/components/AvatarInput';
import { BACKEND_ROUTING } from '@consts/api';
import { capitalize, omit, get } from 'lodash/fp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueryParamsString } from '@src/utils/pagination';
import { History } from 'history';
import { IPaginationResponse, IGenericRemote, RequestStatus } from '@typing/api';
import { IProfile, IAuthTokenResponse, IProfileResponse } from '@typing/profile';
import { IProposal } from '@typing/proposal';
import { storeToast } from '@store/rootReducer';
import { ROUTES } from '@consts/routes';
import apiService from '@services/apiService';

export interface IProfileState {
    isAuth: boolean;
    userProfile: IGenericRemote<IProfile>;
    proposals: IGenericRemote<IProposal[]> & { updateRequestStatus: RequestStatus };
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
        updateRequestStatus: RequestStatus.IDLE,
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
        setProfileRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.userProfile.requestStatus = payload;
        },
        removeProfile() {
            return initialState;
        },
        setProfile(state, { payload: profileData }: PayloadAction<IProfile>) {
            state.userProfile.data = profileData;
            state.isAuth = true;
        },
        /**
         *  ProfileProposals
         */
        setProfileProposalsRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.proposals.requestStatus = payload;
        },
        setProfileProposalsUpdateRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.proposals.updateRequestStatus = payload;
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
        updateProfileProposal(state, { payload: editedProposal }: PayloadAction<IProposal>) {
            state.proposals.data = state.proposals.data.map((proposal: IProposal) =>
                proposal.id === editedProposal.id ? editedProposal : proposal
            );
        },
    },
});

/**
 * Sync actions
 */
export const {
    setProfile,
    removeProfile,
    setProfileRequestStatus,
    setProfileProposalsRequestStatus,
    setProfileProposalsUpdateRequestStatus,
    setProfileProposals,
    updateProfileProposal,
    removeProfileProposals,
    removeOneProfileProposal,
} = profileSlice.actions;

/**
 * Async actions
 */
interface IProfileParams {
    credentials: {
        username: string;
        password: string;
    };
    history: History;
}

interface IProfileInputs {
    avatar: {
        state: AvatarState;
        file: File;
        fileUrl: string;
    };
    username: string;
    email: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    description: string;
}

export interface IProposalRemove {
    id: string;
    name: string;
}

export interface IProposalUpdate {
    id: string;
    formData: {
        category: string;
        city: string;
        cityArea: string;
        description: string;
        title: string;
    };
}

export const loginProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setProfileRequestStatus(RequestStatus.FETCHING));

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
        dispatch(setProfileRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak spróbuj ponownie',
        });
        console.error('Login error:', error);

        dispatch(removeProfile());
        dispatch(setProfileRequestStatus(RequestStatus.ERROR));
    }
};

export const registerProfileAsync = ({ credentials, history }: IProfileParams): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setProfileRequestStatus(RequestStatus.FETCHING));

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
        dispatch(setProfileRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Rejestracja',
            message: 'Kurde, rejestracja jebnęła',
        });

        dispatch(removeProfile());
        dispatch(setProfileRequestStatus(RequestStatus.ERROR));
    }
};

export const logoutProfileAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    history.push(ROUTES.ROOT);

    dispatch(removeProfile());
};

export const fetchProfileAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setProfileRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: profileData }: { data: IProfileResponse } = await apiService.get(BACKEND_ROUTING.AUTH.PROFILE);

        dispatch(setProfile(profileData));
        dispatch(setProfileRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        localStorage.removeItem('token');

        storeToast({
            status: 'error',
            title: 'Logowanie',
            message: 'Coś poszło nie tak, nie udało się pobrać danie twojego profilu',
        });

        dispatch(removeProfile());
        dispatch(setProfileRequestStatus(RequestStatus.ERROR));
    }
};

export const fetchProfileProposalsAsync = (authorId: string): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setProfileProposalsRequestStatus(RequestStatus.FETCHING));

    try {
        const { data: profileProposalsPagination }: { data: IPaginationResponse<IProposal> } = await apiService.get(
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
    dispatch(setProfileRequestStatus(RequestStatus.FETCHING));

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
        dispatch(setProfileRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profil uzytkownika',
            message: 'Nie udało się zapisać dane',
        });

        dispatch(setProfileRequestStatus(RequestStatus.ERROR));
    }
};

export const removeProfileProposalAsync = ({ id, name }: IProposalRemove): AppThunk => async (
    dispatch: AppDispatch
) => {
    try {
        await apiService.delete(`${BACKEND_ROUTING.PROPOSAL.LIST}${id}`);
        dispatch(removeOneProfileProposal(id));

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

export const updateProfileProposalAsync = ({ id, formData }: IProposalUpdate): AppThunk => async (
    dispatch: AppDispatch
) => {
    dispatch(setProfileProposalsUpdateRequestStatus(RequestStatus.FETCHING));
    try {
        const { data: proposal } = await apiService.patch(`${BACKEND_ROUTING.PROPOSAL.LIST}${id}`, formData);
        dispatch(updateProfileProposal(proposal));

        storeToast({
            status: 'success',
            title: 'Profil',
            message: `Partnerstwo "${formData.title}" zostało zedytowane`,
        });
        dispatch(setProfileProposalsUpdateRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Profil',
            message: `Nie udało się zedytować partnerstwo "${formData.title}"`,
        });
        dispatch(setProfileProposalsUpdateRequestStatus(RequestStatus.ERROR));
        console.error('Delete proposal error:', error);
    }
};

export default profileSlice.reducer;
