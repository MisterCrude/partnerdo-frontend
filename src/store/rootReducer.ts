import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '@slices/userSlice';
import homeReducer from '@slices/homeSlice';

const rootReducer = combineReducers({
    user: userReducer,
    home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
