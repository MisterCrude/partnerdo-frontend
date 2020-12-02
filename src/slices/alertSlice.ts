import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '@store/index';
import { RootState } from '@store/rootReducer';
import { TStatuses } from '@models/alerts';

interface IAlertState {
    status: TStatuses;
    title: string;
    message: string;
    timestamp: number;
}

const initialState: IAlertState = {} as IAlertState;

/**
 * Slice
 */
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(state, { payload }: PayloadAction<Omit<TAlertParams, 'timestamp'>>) {
            state.status = payload.status;
            state.title = payload.title;
            state.message = payload.message;
            state.timestamp = Date.now();
        },
    },
});

/**
 * Sync actions
 */
export const { setAlert } = alertSlice.actions;

/**
 * Async actions
 */
type TAlertParams = IAlertState;

export const setAlertAsync = (alert: Omit<TAlertParams, 'timestamp'>): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setAlert(alert));
};

/**
 * Selectors
 */
export const getAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
