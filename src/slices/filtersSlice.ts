import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { values } from 'lodash/fp';

import { BACKEND_ROUTING } from '@consts/api';
import { arrayToDict } from '@src/utils/misc';
// import { ROUTES } from '@consts/routes';
import { IFiltersResponse, IFilters, ICityWithAreas } from '@models/proposal';
import apiService from '@services/apiService';
import { AppThunk, AppDispatch } from '@store/index';
import { storeToast, RootState } from '@store/rootReducer';

export interface IFiltersState extends IFilters {
    fetching: boolean;
}

const initialState: IFiltersState = {
    categories: [],
    cities: {},
    fetching: false,
};

/**
 * Slice
 */
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFetching(state, { payload: isFetching }: PayloadAction<boolean>) {
            state.fetching = isFetching;
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
export const { setFilters, removeFilters, setFetching } = filtersSlice.actions;

/**
 * Async actions
 */
export const fetchFiltersAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(setFetching(true));

    try {
        const {
            data: { categories, cities },
        }: { data: IFiltersResponse } = await apiService.get(BACKEND_ROUTING.PROPOSAL.FILTERS);

        const citiesDict = arrayToDict<ICityWithAreas>(cities, 'id');

        dispatch(setFilters({ categories, cities: citiesDict }));
    } catch (error) {
        dispatch(removeFilters());

        storeToast({
            status: 'error',
            title: 'Partnerstwa',
            message: 'Nie udało się pobrać filtrów',
        });

        console.error('Proposal filters error:', error);
    }

    dispatch(setFetching(false));
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
