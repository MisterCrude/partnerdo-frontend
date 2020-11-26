import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Circle, Flex, SimpleGrid } from '@chakra-ui/core';
import { ChatIcon, ProfileIcon, PlusIcon, SearchIcon } from '@theme/customIcons';
import { ROUTES } from '@config/app';

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
            paddingY={3}
            justifyContent="center"
            flexDirection="column"
            variant="link"
        >
            <PlusIcon fontSize={30} />
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
            <SearchIcon fontSize={30} />
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
                <ChatIcon fontSize={30} />
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
            <ProfileIcon fontSize={30} />
        </Flex>
    </SimpleGrid>
);

export const NotLoggedinSet: React.FC = () => (
    <Flex justifyContent="center">
        <Flex alignItems="center" borderRadius={0} justifyContent="flex-end" paddingY={3} marginX={2} variant="link">
            <Button as={Link} to={ROUTES.LOGIN}>
                Zaloguj się
            </Button>
        </Flex>
        <Flex alignItems="flex" borderRadius={0} justifyContent="flex-start" paddingY={3} marginX={2} variant="link">
            <Button
                as={Link}
                backgroundColor="gray.800"
                color="white"
                to={ROUTES.REGISTER}
                variant="solid"
                _active={{ backgroundColor: 'gray.900' }}
                _hover={{ backgroundColor: 'gray.600' }}
            >
                Zarejestruj się
            </Button>
        </Flex>
    </Flex>
);

export const ToolsBar: React.FC<IProps> = ({ hasMessages, isLoggedin, mobileOnly }) => (
    <Box
        as="section"
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
