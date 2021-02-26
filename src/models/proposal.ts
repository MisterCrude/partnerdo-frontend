import React from 'react';
import { IconProps } from '@chakra-ui/react';
import { RecordNamedItem } from './misc';

export interface IProposalCategoryIcon {
    name: string;
    iconColored: React.FC<IconProps>;
    iconStroked: React.FC<IconProps>;
}

export interface IAnthor {
    avatar: string;
    firstName: string;
    id: string;
    lastName: string;
    username: string;
}
export type ICity = RecordNamedItem;
export type ICategory = RecordNamedItem;
export type ICityArea = RecordNamedItem;

export interface IProposal {
    author: IAnthor;
    category: ICategory;
    cityArea: ICityArea;
    city: ICity;
    created: string;
    description: string;
    id: string;
    title: string;
    updated: string;
}

export interface IProposalResponse {
    count: number;
    next: string;
    previous: string;
    results: IProposal[];
}
