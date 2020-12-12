import React from 'react';
import { IconProps } from '@chakra-ui/react';

export interface IProposalCategory {
    name: string;
    iconUrl: React.FC<IconProps>;
    bgColor: string;
}
