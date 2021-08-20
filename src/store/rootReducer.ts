import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import chatroomReducer from '@slices/chatroomSlice';
import filterReducer from '@slices/filterSlice';
import profileReducer from '@slices/profileSlice';
import proposalReducer from '@slices/proposalSlice';
import userReducer from '@slices/userSlice';

const rootReducer = combineReducers({
    chatroom: chatroomReducer,
    filter: filterReducer,
    profile: profileReducer,
    proposal: proposalReducer,
    user: userReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
