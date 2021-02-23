import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { History } from 'history';
// import { capitalize } from 'lodash/fp';

// import { BACKEND_ROUTING } from '@config/api';
// import { ROUTES } from '@config/app';
// import { IProposal, IPaginatedProposal } from '@models/proposal';
import { IPaginatedProposal } from '@models/proposal';
// import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
// import { RootState, storeToast } from '@store/rootReducer';
import { storeToast } from '@store/rootReducer';

export interface IProposalState {
    proposals: IPaginatedProposal;
    fetching: boolean;
}

const initialState: IProposalState = {
    proposals: {} as IPaginatedProposal,
    fetching: false,
};

/**
 * Slice
 */
const proposalSlice = createSlice({
    name: 'proposal',
    initialState,
    reducers: {
        setFetching(state, { payload: isFetching }: PayloadAction<boolean>) {
            state.fetching = isFetching;
        },
        // = Remove Proposal =
        // = Create Proposal =
        // = Update Proposal =
        // = List Proposals Retrieve =

        // removeUser(state) {
        //     state.data = {} as IUser;
        //     state.isAuth = false;
        // },
        setProposals(state, { payload }: PayloadAction<IPaginatedProposal>) {
            state.proposals = payload;
        },
    },
});

/**
 * Sync actions
 */
export const { setProposals, setFetching } = proposalSlice.actions;

/**
 * Async actions
 */
export const fetchProposalsAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        // const { data: proposals }: { data: IPaginatedProposal } = await apiService.get(BACKEND_ROUTING.PROPOSAL.LIST);
        // dispatch(setProposals(proposals));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: 'Nie udało się pobrać listę partnerstw',
        });
    }

    dispatch(setFetching(false));
};

// export const registerUserAsync = ({ credentials, history }: IUserParams): AppThunk => async (dispatch: AppDispatch) => {
//     dispatch(setFetching(true));

//     try {
//         const { data: token }: { data: ITokeResponse } = await apiService.post(
//             BACKEND_ROUTING.AUTH.REGISTER,
//             credentials
//         );
//         const { data: userData }: { data: IUserResponse } = await apiService.get(BACKEND_ROUTING.AUTH.USER, {
//             headers: {
//                 Authorization: `token ${token.key}`,
//             },
//         });

//         localStorage.setItem('token', token.key);
//         history.push(ROUTES.PROPOSALS);

//         dispatch(setUser({ user: userData }));

//         storeToast({
//             status: 'success',
//             title: 'Rejestracja',
//             message: `${capitalize(userData.username)}, witamy Cię po raz pierwszy w naszym serwisie`,
//         });
//     } catch (error) {
//         storeToast({
//             status: 'error',
//             title: 'Rejestracja',
//             message: 'Kurde, rejestracja jebnęła',
//         });
//     }

//     dispatch(setFetching(false));
// };

// export const logoutUserAsync = (history: History): AppThunk => (dispatch: AppDispatch) => {
//     localStorage.removeItem('token');
//     history.push(ROUTES.ROOT);

//     dispatch(removeUser());
// };

// export const fetchUserAsync = (): AppThunk => async (dispatch: AppDispatch) => {
//     dispatch(setFetching(true));

//     try {
//         const { data: userData }: { data: IUserResponse } = await apiService.get(BACKEND_ROUTING.AUTH.USER);

//         dispatch(setUser({ user: userData }));
//     } catch (error) {
//         localStorage.removeItem('token');

//         dispatch(removeUser());

//         storeToast({
//             status: 'error',
//             title: 'Logowanie',
//             message: 'Coś poszło nie tak, wyjebało Cię z tej wspaniałej apki',
//         });
//     }

//     dispatch(setFetching(false));
// };

/**
 * Selectors
 */
// export const getUserData = (state: RootState) => state.user.data;
// export const getIsAuth = (state: RootState) => state.user.isAuth;
// export const getIsFetching = (state: RootState) => state.user.fetching;

// export default userSlice.reducer;
