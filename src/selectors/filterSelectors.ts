import { createSelector } from '@reduxjs/toolkit';
import { ICityWithAreas } from '@typing/proposal';
import { RootState } from '@store/rootReducer';
import { values } from 'lodash/fp';

export const getCategoriesSelector = (state: RootState) => state.filter.categories;
export const getCitiesDictSelector = (state: RootState) => state.filter.cities;
export const getCitiesSelector = createSelector(getCitiesDictSelector, (cities) =>
    values(cities).map(({ name, id }: ICityWithAreas) => ({ name, id }))
);
export const getCityAreasSelector = createSelector(getCitiesDictSelector, (cities) => (cityId: string) =>
    cities[cityId].cityAreas
);
