import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compose, set, unset } from 'lodash/fp';
import { BACKEND_ROUTING } from '@config/api';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { IUserState, IUser, ILoginResponce, IUserResponce } from '@models/user';

const initialState: IUserState = {
    isLogged: false,
    data: null,
};

/**
 * Slice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<{ token: ILoginResponce; user: IUser }>) {
            localStorage.setItem('token', payload.token.key);
            state.isLogged = true;
            state.data = payload.user;
        },
        // removeUser(state, { payload }: PayloadAction<any>) {
        //     localStorage.removeItem('token');
        // },
    },
});

/**
 * Sync actions
 */
export const { setUser } = userSlice.actions;

/**
 * Async actions
 */
export const userLoginAsync = (credentials: Record<string, unknown>): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const { data: token }: { data: ILoginResponce } = await apiService.post(
            BACKEND_ROUTING.AUTH.LOGIN,
            credentials
        );
        const { data: user }: { data: IUserResponce } = await apiService.get(BACKEND_ROUTING.AUTH.USER);
        const normalizedUser = compose(unset('pk'), set('id', user.pk))(user);

        dispatch(setUser({ token, user: normalizedUser }));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;
