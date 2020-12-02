import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '@slices/userSlice';
import alertReducer from '@slices/alertSlice';
import homeReducer from '@slices/homeSlice';

const rootReducer = combineReducers({
    alert: alertReducer,
    user: userReducer,
    home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
