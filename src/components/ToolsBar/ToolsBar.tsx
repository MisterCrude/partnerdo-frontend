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
}

export const LoggedinSet: React.FC<IPropsLoggedinSet> = ({ hasMessages }) => (
    <>
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
            {/* <Text fontSize="xs">Wiadomości</Text> */}
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
    </>
);

export const NotLoggedinSet: React.FC = () => (
    <>
        <Flex alignItems="center" borderRadius={0} paddingY={2} justifyContent="flex-end" variant="link">
            <Button variant="outline">Zaloguj się</Button>
        </Flex>
        <Flex alignItems="flex" borderRadius={0} paddingY={2} justifyContent="flex-start" variant="link">
            <Button colorScheme="orange">Zarejestruj się</Button>
        </Flex>
    </>
);

export const ToolsBar: React.FC<IProps> = ({ hasMessages, isLoggedin, mobileOnly }) => (
    <SimpleGrid
        bottom={0}
        boxShadow="xs"
        backgroundColor="white"
        display={mobileOnly ? { base: 'grid', md: 'none' } : { base: 'grid' }}
        data-testid="toolsBar"
        position="fixed"
        spacing={isLoggedin ? 0 : 4}
        templateColumns={`repeat(${isLoggedin ? 4 : 2}, 1fr)`}
        width="100vw"
        zIndex="docked"
    >
        {isLoggedin ? <LoggedinSet hasMessages={hasMessages} /> : <NotLoggedinSet />}
    </SimpleGrid>
);
