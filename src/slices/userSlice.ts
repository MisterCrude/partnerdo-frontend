import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { AppThunk, AppDispatch } from '@store/index';
import { camelCaseResponce } from '@utils/api';
import { IUser } from '@models/user';
import { RootState } from '@store/rootReducer';

const initialState: IUser = {
    isLogged: false,
    data: null,
    accessToken: '',
    refreshToken: '',
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
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
});
// {
//     "username": "",
//     "email": "",
//     "password1": "",
//     "password2": ""
// }
/**
 * Sync actions
 */
export const { setUser } = userSlice.actions;

/**
 * Async actions
 */
export const userRegisterAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const { data: userData }: any = await axios.post('http://127.0.0.1:8000/api/v1.0/auth/registration/', {
            username: 'namename11wsssw111',
            email: 'name@mil11s1wssw11.com',
            password1: 'qweqweqwe!!',
            password2: 'qweqweqwe!!',
        });
        const normalizedData = camelCaseResponce(userData);
        console.log('normalizedData ', normalizedData);
        console.log('userData ', userData);

        dispatch(setUser(normalizedData));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Selectors
 */
export const getUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;
