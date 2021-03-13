import React from 'react';
import { IconProps } from '@chakra-ui/react';
import { RecordNamedItem } from './misc';
import { IUser } from './user';

export interface IProposalCategoryIcon {
    name: string;
    iconColored: React.FC<IconProps>;
    iconStroked: React.FC<IconProps>;
}

export interface IAuthor extends Omit<IUser, 'gender' | 'birthYear' | 'email'> {
    id: string;
}

export type ICity = RecordNamedItem;
export type ICategory = RecordNamedItem;
export type ICityArea = RecordNamedItem;

export interface IProposal {
    author: IAuthor;
    category: ICategory;
    cityArea: ICityArea;
    city: ICity;
    created: string;
    description: string;
    id: string;
    title: string;
    updated: string;
}

export interface ICityWithAreas extends ICity {
    cityAreas: ICityArea[];
}
export interface IFilters {
    categories: ICategory[];
    cities: Record<string, ICityWithAreas>;
}

export interface IProposalResponse {
    count: number;
    next: string;
    previous: string;
    results: IProposal[];
}

export interface IFiltersResponse {
    categories: ICategory[];
    cities: ICityWithAreas[];
}
