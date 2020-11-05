import React from 'react';

import { Box, Button, Circle, Flex, SimpleGrid } from '@chakra-ui/core';
import { ChatIcon, ProfileIcon, PlusIcon, SearchIcon } from '@theme/customIcons';

interface IProps {
    hasMessages: boolean;
    mobileOnly: boolean;
    isLoggedin: boolean;
}

interface IPropsLoggedinSet {
    hasMessages: boolean;
    mobileOnly: boolean;
}

export const LoggedinSet: React.FC<IPropsLoggedinSet> = ({ hasMessages }) => (
    <SimpleGrid templateColumns="repeat(4, 1fr)">
        <Flex
            as={Button}
            alignItems="center"
            borderRadius={0}
            color="gray.700"
            paddingY={2}
            justifyContent="center"
            flexDirection="column"
            variant="link"
        >
            <PlusIcon fontSize={36} />
        </Flex>
        <Flex
            as={Button}
            alignItems="center"
            borderRadius={0}
            color="gray.700"
            justifyContent="center"
            paddingY={3}
            flexDirection="column"
            variant="link"
        >
            <SearchIcon fontSize={36} />
        </Flex>
        <Flex
            as={Button}
            alignItems="center"
            borderRadius={0}
            color="gray.700"
            paddingY={3}
            justifyContent="center"
            flexDirection="column"
            variant="link"
        >
            <Box as="span" position="relative">
                <ChatIcon fontSize={36} />
                {hasMessages && <Circle position="absolute" size={3} bg="tomato" color="white" top={0} right={0} />}
            </Box>
        </Flex>
        <Flex
            as={Button}
            alignItems="center"
            borderRadius={0}
            color="gray.700"
            justifyContent="center"
            paddingY={3}
            flexDirection="column"
            variant="link"
        >
            <ProfileIcon fontSize={36} />
        </Flex>
    </SimpleGrid>
);

export const NotLoggedinSet: React.FC = () => (
    <Flex justifyContent="center">
        <Flex alignItems="center" borderRadius={0} justifyContent="flex-end" paddingY={2} marginX={3} variant="link">
            <Button size="lg" variant="outline">
                Zaloguj się
            </Button>
        </Flex>
        <Flex alignItems="flex" borderRadius={0} justifyContent="flex-start" paddingY={2} marginX={3} variant="link">
            <Button size="lg" colorScheme="orange">
                Zarejestruj się
            </Button>
        </Flex>
    </Flex>
);

export const ToolsBar: React.FC<IProps> = ({ hasMessages, isLoggedin, mobileOnly }) => (
    <Box
        boxShadow="xs"
        bottom={0}
        backgroundColor="white"
        display={mobileOnly ? { base: 'grid', md: 'none' } : { base: 'grid' }}
        data-testid="toolsBar"
        position="fixed"
        width="100vw"
        zIndex="docked"
    >
        {isLoggedin ? <LoggedinSet hasMessages={hasMessages} mobileOnly={mobileOnly} /> : <NotLoggedinSet />}
    </Box>
);
