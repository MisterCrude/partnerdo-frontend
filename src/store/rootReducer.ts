import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import chatroomsReducer from '@slices/chatroomsSlice';
import filtersReducer from '@slices/filtersSlice';
import profileReducer from '@slices/profileSlice';
import proposalReducer from '@slices/proposalSlice';
import userReducer from '@slices/userSlice';

const rootReducer = combineReducers({
    chatrooms: chatroomsReducer,
    filters: filtersReducer,
    profile: profileReducer,
    proposal: proposalReducer,
    user: userReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
