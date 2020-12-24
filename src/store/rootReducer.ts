import { combineReducers } from '@reduxjs/toolkit';
import toast from '@services/toast';

import userReducer from '@slices/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});
const storeToast = toast();

export type RootState = ReturnType<typeof rootReducer>;
export { storeToast };
export default rootReducer;
