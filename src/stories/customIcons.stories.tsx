import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import {
    BusinessColoredIcon,
    BusinessIcon,
    CategoryIcon,
    ChatIcon,
    ChildrenColoredIcon,
    ChildrenIcon,
    CrossEyeIcon,
    DangerIcon,
    DeleteIcon,
    DotsMenuIcon,
    EditIcon,
    EventColoredIcon,
    EventIcon,
    EyeIcon,
    FacebookIcon,
    FilterIcon,
    GameColoredIcon,
    GameIcon,
    InstagramIcon,
    LearningColoredIcon,
    LearningIcon,
    LocationIcon,
    MenuIcon,
    MoreCircleIcon,
    MusicColoredIcon,
    MusicIcon,
    PlusIcon,
    ProfileIcon,
    PublishIcon,
    SearchIcon,
    SportColoredIcon,
    SportIcon,
    TravelColoredIcon,
    TravelIcon,
    UnpublishIcon,
    YoutubeIcon,
    SmallCloseIcon,
    SmallDangerIcon,
    SmallTickIcon,
    CloseIcon,
    TickIcon,
} from '@theme/customIcons';
import { Stack, SimpleGrid, Text, Box } from '@chakra-ui/react';

export default {
    component: Stack,
    title: 'Misc/CustomIcons',
    parameters: {
        controls: {
            disabled: true,
        },
    },
} as Meta;

export const Outline: React.FC = () => (
    <SimpleGrid gap={3} columns={5} fontSize={28}>
        <Box align="center">
            <Text fontSize="xs">ProfileIcon</Text>
            <ProfileIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">ChatIcon</Text>
            <ChatIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">DangerIcon</Text>
            <DangerIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">MoreCircleIcon</Text>
            <MoreCircleIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">PlusIcon</Text>
            <PlusIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SearchIcon</Text>
            <SearchIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">MenuIcon</Text>
            <MenuIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">LocationIcon</Text>
            <LocationIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">FacebookIcon</Text>
            <FacebookIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">InstagramIcon</Text>
            <InstagramIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">YoutubeIcon</Text>
            <YoutubeIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">EyeIcon</Text>
            <EyeIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">CrossEyeIcon</Text>
            <CrossEyeIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">CategoryIcon</Text>
            <CategoryIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">EditIcon</Text>
            <EditIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">DeleteIcon</Text>
            <DeleteIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">DotsMenuIcon</Text>
            <DotsMenuIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">UnpublishIcon</Text>
            <UnpublishIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">PublishIcon</Text>
            <PublishIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">FilterIcon</Text>
            <FilterIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SmallCloseIcon</Text>
            <SmallCloseIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SmallDangerIcon</Text>
            <SmallDangerIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SmallTickIcon</Text>
            <SmallTickIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">CloseIcon</Text>
            <CloseIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">TickIcon</Text>
            <TickIcon />
        </Box>
    </SimpleGrid>
);
export const Categories: React.FC = () => (
    <SimpleGrid gap={5} columns={6} fontSize={68}>
        <Box align="center">
            <Text fontSize="xs">MusicIcon</Text>
            <MusicIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">MusicColoredIcon</Text>
            <MusicColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">BusinessColoredIcon</Text>
            <BusinessColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">BusinessIcon</Text>
            <BusinessIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">TravelColoredIcon</Text>
            <TravelColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">TravelIcon</Text>
            <TravelIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">LearningIcon</Text>
            <LearningIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">LearningColoredIcon</Text>
            <LearningColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SportIcon</Text>
            <SportIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">SportColoredIcon</Text>
            <SportColoredIcon />
        </Box>

        <Box align="center">
            <Text fontSize="xs">GameColoredIcon</Text>
            <GameColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">GameIcon</Text>
            <GameIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">EventIcon</Text>
            <EventIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">EventColoredIcon</Text>
            <EventColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">ChildrenColoredIcon</Text>
            <ChildrenColoredIcon />
        </Box>
        <Box align="center">
            <Text fontSize="xs">ChildrenIcon</Text>
            <ChildrenIcon />
        </Box>
    </SimpleGrid>
);
