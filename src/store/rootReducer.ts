import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import userReducer from '@slices/userSlice';
import proposalReducer from '@slices/proposalSlice';
import filtersReducer from '@slices/filtersSlice';

const rootReducer = combineReducers({
    user: userReducer,
    proposal: proposalReducer,
    filters: filtersReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
