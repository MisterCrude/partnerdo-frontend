import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BACKEND_ROUTING } from '@config/api';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { IUser } from '@models/user';

const initialState: IUser = {
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
        setUser(state, action: PayloadAction<any>) {
            state.isLogged = true;
            state.data = action.payload.user;
        },
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
        const { data: userData }: any = await apiService.post(BACKEND_ROUTING.AUTH.LOGIN, credentials);

        dispatch(setUser(userData));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;
