import React from 'react';

import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

export const Pagination: React.FC = () => (
    <HStack align="center" spacing={2}>
        <IconButton aria-label="Search database" fontWeight="normal" icon={<ChevronLeftIcon />} fontSize={22} isRound />
        <IconButton aria-label="Search database" fontWeight="normal" icon={<>1</>} isRound />
        <IconButton aria-label="Search database" colorScheme="orange" fontWeight="normal" icon={<>2</>} isRound />
        <IconButton aria-label="Search database" fontWeight="normal" icon={<>3</>} isRound />
        <Box px={1} fontWeight="normal">
            ...
        </Box>
        <IconButton aria-label="Search database" fontWeight="normal" icon={<>5</>} isRound />
        <IconButton
            aria-label="Search database"
            fontWeight="normal"
            icon={<ChevronRightIcon />}
            fontSize={22}
            isRound
        />
    </HStack>
);
