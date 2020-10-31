import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';

interface IAppLoad {
    isLoaded: boolean;
}

const initialState: IAppLoad = {
    isLoaded: false,
};

/**
 * Slice
 */
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appLoad: {
            reducer: (state, action: PayloadAction<boolean>) => {
                state.isLoaded = action.payload;
            },
            prepare: (isLoad: boolean) => ({ payload: isLoad }),
        },
    },
});

/**
 * Sync actions
 */
export const { appLoad } = appSlice.actions;

/**
 * Async actions
 */
export const appLoadAsync = (isLoad: boolean): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(appLoad(isLoad));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Selectors
 */
export const getIsAppload = (state: RootState) => state.app.isLoaded;

export default appSlice.reducer;
