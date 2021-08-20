// import { ROUTES } from '@consts/routes';
import { AppThunk, AppDispatch } from '@store/index';
import { toDict } from '@utils/convert';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter, ICityWithAreas, IFilterResponse } from '@typing/proposal';
import { RequestStatus } from '@typing/api';
import { storeToast } from '@store/rootReducer';
import apiService from '@services/apiService';

export interface IFilterState extends IFilter {
    requestStatus: RequestStatus;
}

const initialState: IFilterState = {
    categories: [],
    cities: {},
    requestStatus: RequestStatus.IDLE,
};

/**
 * Slice
 */
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.requestStatus = payload;
        },
        removeFilter(state) {
            state.categories = [];
            state.cities = {};
        },
        setFilter(state, { payload: { categories, cities } }: PayloadAction<IFilter>) {
            state.categories = categories;
            state.cities = cities;
        },
    },
});

/**
 * Sync actions
 */
export const { setFilter, removeFilter, setRequestStatus } = filterSlice.actions;

/**
 * Async actions
 */
export const fetchFilterAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setRequestStatus(RequestStatus.FETCHING));

    try {
        const {
            data: { categories, cities },
        }: { data: IFilterResponse } = await apiService.get(BACKEND_ROUTING.PROPOSAL.FILTERS);

        const citiesDict = toDict<ICityWithAreas>(cities, 'id');

        dispatch(setFilter({ categories, cities: citiesDict }));
        dispatch(setRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: 'Nie udało się pobrać filtrów',
        });

        console.error('Proposal filters error:', error);

        dispatch(removeFilter());
        dispatch(setRequestStatus(RequestStatus.ERROR));
    }
};

export default filterSlice.reducer;
