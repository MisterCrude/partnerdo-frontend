import { ROUTES } from '@consts/routes';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Circle, Flex, SimpleGrid } from '@chakra-ui/react';
import { ChatIcon, ProfileIcon, PlusIcon, SearchIcon } from '@theme/customIcons';

interface IPropsLoggedinSet {
    hasNotification: boolean;
    mobileOnly: boolean;
}

export const LoggedinSet = ({ hasNotification }: IPropsLoggedinSet) => (
    <SimpleGrid templateColumns="repeat(4, 1fr)">
        <Button
            as={RouterLink}
            alignItems="center"
            borderRadius={0}
            color="gray.800"
            paddingY={3}
            justifyContent="center"
            flexDirection="column"
            variant="link"
            to={ROUTES.PROPOSALS_CREATE}
        >
            <PlusIcon fontSize={30} />
        </Button>
        <Button
            as={RouterLink}
            alignItems="center"
            borderRadius={0}
            color="gray.800"
            justifyContent="center"
            paddingY={3}
            flexDirection="column"
            variant="link"
            to={ROUTES.PROPOSALS}
        >
            <SearchIcon fontSize={30} />
        </Button>
        <Button
            as={RouterLink}
            alignItems="center"
            borderRadius={0}
            color="gray.800"
            paddingY={3}
            justifyContent="center"
            flexDirection="column"
            variant="link"
            to={ROUTES.CHAT}
        >
            <Box as="span" pos="relative">
                <ChatIcon fontSize={30} />
                {hasNotification && <Circle pos="absolute" size={3} bg="tomato" color="white" top={0} right={0} />}
            </Box>
        </Button>
        <Button
            as={RouterLink}
            alignItems="center"
            borderRadius={0}
            color="gray.800"
            justifyContent="center"
            paddingY={3}
            flexDirection="column"
            variant="link"
            to={ROUTES.PROFILE}
        >
            <ProfileIcon fontSize={30} />
        </Button>
    </SimpleGrid>
);

export const NotLoggedinSet = () => (
    <Flex justifyContent="center">
        <Flex alignItems="center" borderRadius={0} justifyContent="flex-end" paddingY={3} marginX={2} variant="link">
            <Button as={RouterLink} to={ROUTES.LOGIN}>
                Zaloguj się
            </Button>
        </Flex>
        <Flex alignItems="flex" borderRadius={0} justifyContent="flex-start" paddingY={3} marginX={2} variant="link">
            <Button
                as={RouterLink}
                bgColor="gray.800"
                color="white"
                to={ROUTES.REGISTER}
                variant="solid"
                _active={{ bgColor: 'gray.800' }}
                _hover={{ bgColor: 'gray.600' }}
            >
                Zarejestruj się
            </Button>
        </Flex>
    </Flex>
);

interface IToolsBarProps {
    hasNotification: boolean;
    mobileOnly: boolean;
    isAuth: boolean;
}

export const ToolsBar = ({ hasNotification, isAuth, mobileOnly }: IToolsBarProps) => (
    <Box
        as="section"
        shadow="xs"
        bottom={0}
        bgColor="white"
        d={mobileOnly ? { base: 'grid', md: 'none' } : { base: 'grid' }}
        data-testid="toolsBar"
        pos="fixed"
        w="100vw"
        zIndex="docked"
    >
        {isAuth ? <LoggedinSet hasNotification={hasNotification} mobileOnly={mobileOnly} /> : <NotLoggedinSet />}
    </Box>
);
