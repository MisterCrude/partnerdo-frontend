import React from 'react';
import { IconProps } from '@chakra-ui/react';

export interface IProposalCategory {
    name: string;
    iconColored: React.FC<IconProps>;
    iconStroked: React.FC<IconProps>;
}
