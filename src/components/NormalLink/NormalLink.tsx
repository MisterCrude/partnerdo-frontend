import React from 'react';

import { Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
    to: string;
    color?: string;
}

export const NormalLink: React.FC<IProps> = ({ children, color = 'gray.800', to }) => (
    <Box as={RouterLink} color={color} to={to} mx={1} _hover={{ textDecor: 'underline' }}>
        {children}
    </Box>
);
