import React from 'react';
import { IconProps } from '@chakra-ui/react';
import { RecordNamedItem } from './misc';
import { IProfile } from './profile';

export interface IProposalCategoryIcon {
    name: string;
    iconColored: React.FC<IconProps>;
    iconStroked: React.FC<IconProps>;
}

export interface IAuthor extends Omit<IProfile, 'gender' | 'birthYear' | 'email'> {
    id: string;
}

export type ICity = RecordNamedItem;
export type ICategory = Record<'name' | 'id' | 'color' | 'image', string>;
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
}

export interface IFilterData {
    age: string[];
    categories: string[];
    city: string;
    cityAreas: string[];
    gender: string[];
    pageNumber: number;
    search: string;
}

export interface ICityWithAreas extends ICity {
    cityAreas: ICityArea[];
}

export interface IFilter {
    categories: ICategory[];
    cities: Record<string, ICityWithAreas>;
}

export interface IFilterResponse {
    categories: ICategory[];
    cities: ICityWithAreas[];
}

export interface IProposalResponse extends IProposal {
    // TODO remove id when add new fields
    id: string;
}
