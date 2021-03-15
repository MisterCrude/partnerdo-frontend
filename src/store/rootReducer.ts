import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import profileReducer from '@slices/profileSlice';
import proposalReducer from '@slices/proposalSlice';
import filtersReducer from '@slices/filtersSlice';

const rootReducer = combineReducers({
    profile: profileReducer,
    proposal: proposalReducer,
    filters: filtersReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
