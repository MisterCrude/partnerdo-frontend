import React from 'react';

import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

export const Pagination: React.FC = () => (
    <HStack align="center" spacing={2}>
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            icon={<ChevronLeftIcon />}
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            fontSize={22}
            isRound
        />
        <IconButton
            aria-label="Pagination button"
            colorScheme="orange"
            fontWeight="normal"
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            icon={<>1</>}
            isRound
        />
        <IconButton
            aria-label="Pagination button"
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            fontWeight="normal"
            icon={<>2</>}
            isRound
        />
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            icon={<>3</>}
            isRound
        />
        <Box px={1} fontWeight="normal">
            ...
        </Box>
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            icon={<>5</>}
            isRound
        />
        <IconButton
            aria-label="Pagination button"
            fontWeight="normal"
            fontSize={22}
            minW={{ base: 9, md: 10 }}
            h={{ base: 9, md: 10 }}
            icon={<ChevronRightIcon />}
            isRound
        />
    </HStack>
);
