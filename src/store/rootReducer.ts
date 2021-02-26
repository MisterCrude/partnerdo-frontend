import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import userReducer from '@slices/userSlice';
// TODO rename to pagination reducer
import proposalReducer from '@slices/proposalSlice';

const rootReducer = combineReducers({
    user: userReducer,
    pagination: proposalReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
