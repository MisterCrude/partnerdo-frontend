import React from 'react';

import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

export const Pagination: React.FC = () => (
    <HStack align="center" spacing={2}>
        <IconButton
            aria-label="Pagination button"
            fontSize={22}
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<ChevronLeftIcon />}
            isRound
            minW={{ base: 9, md: 10 }}
        />
        <IconButton
            aria-label="Pagination button"
            colorScheme="orange"
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<>1</>}
            isRound
            minW={{ base: 9, md: 10 }}
        />
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<>2</>}
            isRound
            minW={{ base: 9, md: 10 }}
        />
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<>3</>}
            isRound
            minW={{ base: 9, md: 10 }}
        />
        <Box px={1} fontWeight="normal">
            ...
        </Box>
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<>5</>}
            isRound
            minW={{ base: 9, md: 10 }}
        />
        <IconButton
            aria-label="Pagination button"
            fontSize={22}
            fontWeight="normal"
            h={{ base: 9, md: 10 }}
            icon={<ChevronRightIcon />}
            isRound
            minW={{ base: 9, md: 10 }}
        />
    </HStack>
);
