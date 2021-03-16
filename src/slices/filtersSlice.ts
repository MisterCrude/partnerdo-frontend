// import { ROUTES } from '@consts/routes';
import { AppThunk, AppDispatch } from '@store/index';
import { arrayToDict } from '@src/utils/misc';
import { BACKEND_ROUTING } from '@consts/api';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { IFiltersResponse, IFilters, ICityWithAreas } from '@models/proposal';
import { RequestStatus } from '@models/misc';
import { storeToast, RootState } from '@store/rootReducer';
import { values } from 'lodash/fp';
import apiService from '@services/apiService';

export interface IFiltersState extends IFilters {
    requestStatus: RequestStatus;
}

const initialState: IFiltersState = {
    categories: [],
    cities: {},
    requestStatus: RequestStatus.IDLE,
};

/**
 * Slice
 */
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setRequestStatus(state, { payload }: PayloadAction<RequestStatus>) {
            state.requestStatus = payload;
        },
        removeFilters(state) {
            state.categories = [];
            state.cities = {};
        },
        setFilters(state, { payload: { categories, cities } }: PayloadAction<IFilters>) {
            state.categories = categories;
            state.cities = cities;
        },
    },
});

/**
 * Sync actions
 */
export const { setFilters, removeFilters, setRequestStatus } = filtersSlice.actions;

/**
 * Async actions
 */
export const fetchFiltersAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setRequestStatus(RequestStatus.FETCHING));

    try {
        const {
            data: { categories, cities },
        }: { data: IFiltersResponse } = await apiService.get(BACKEND_ROUTING.PROPOSAL.FILTERS);

        const citiesDict = arrayToDict<ICityWithAreas>(cities, 'id');

        dispatch(setFilters({ categories, cities: citiesDict }));
        dispatch(setRequestStatus(RequestStatus.SUCCESS));
    } catch (error) {
        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: 'Nie udało się pobrać filtrów',
        });

        console.error('Proposal filters error:', error);

        dispatch(removeFilters());
        dispatch(setRequestStatus(RequestStatus.ERROR));
    }
};

/**
 * Selectors
 */
export const getCategoriesSelector = (state: RootState) => state.filters.categories;
export const getCitiesDictSelector = (state: RootState) => state.filters.cities;
export const getCitiesSelector = createSelector(getCitiesDictSelector, (cities) =>
    values(cities).map(({ name, id }: ICityWithAreas) => ({ name, id }))
);
export const getCityAreasSelector = createSelector(getCitiesDictSelector, (cities) => (cityId: string) =>
    cities[cityId].cityAreas
);

export default filtersSlice.reducer;
