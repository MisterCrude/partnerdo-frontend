import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import profileReducer from '@slices/profileSlice';
import proposalReducer from '@slices/proposalSlice';
import filtersReducer from '@slices/filtersSlice';
import userReducer from '@slices/userSlice';
import chatroomsReducer from '@slices/chatroomsSlice';

const rootReducer = combineReducers({
    profile: profileReducer,
    chatrooms: chatroomsReducer,
    filters: filtersReducer,
    proposal: proposalReducer,
    user: userReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
