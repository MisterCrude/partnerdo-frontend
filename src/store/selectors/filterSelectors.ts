import { createSelector } from '@reduxjs/toolkit';
import { ICityWithAreas } from '@typing/proposal';
import { RootState } from '@store/rootReducer';
import { values } from 'lodash/fp';

export const categoryListSelector = (state: RootState) => state.filter.categories;
export const cityDictSelector = (state: RootState) => state.filter.cities;
export const cityListSelector = createSelector(cityDictSelector, (cities) =>
    values(cities).map(({ name, id }: ICityWithAreas) => ({ name, id }))
);
export const cityAreaListSelector = createSelector(cityDictSelector, (cities) => (cityId: string) =>
    cities[cityId].cityAreas
);
