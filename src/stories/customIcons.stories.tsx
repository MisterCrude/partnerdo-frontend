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
} from '@theme/customIcons';
import { Stack, SimpleGrid } from '@chakra-ui/react';

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
        <ProfileIcon />
        <ChatIcon />
        <DangerIcon />
        <MoreCircleIcon />
        <PlusIcon />
        <SearchIcon />
        <MenuIcon />
        <LocationIcon />
        <FacebookIcon />
        <InstagramIcon />
        <YoutubeIcon />
        <EyeIcon />
        <CrossEyeIcon />
        <CategoryIcon />
        <EditIcon />
        <DeleteIcon />
        <DotsMenuIcon />
        <UnpublishIcon />
        <PublishIcon />
        <FilterIcon />
    </SimpleGrid>
);
export const Categories: React.FC = () => (
    <SimpleGrid gap={5} columns={6} fontSize={68}>
        <MusicIcon />
        <MusicColoredIcon />
        <BusinessIcon />
        <BusinessColoredIcon />
        <TravelIcon />
        <TravelColoredIcon />
        <LearningIcon />
        <LearningColoredIcon />
        <SportIcon />
        <SportColoredIcon />
        <EventIcon />
        <EventColoredIcon />
        <ChildrenIcon />
        <ChildrenColoredIcon />
        <GameIcon />
        <GameColoredIcon />
    </SimpleGrid>
);
