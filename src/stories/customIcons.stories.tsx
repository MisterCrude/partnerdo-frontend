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
import { Box } from '@chakra-ui/react';

export default {
    component: Box,
    title: 'Misc/CustomIcons',
    parameters: {
        controls: {
            disabled: true,
        },
    },
} as Meta;

export const Default: React.VFC = () => (
    <>
        <Box>
            <ProfileIcon boxSize={6} m={2} />
            <ChatIcon boxSize={6} m={2} />
            <DangerIcon boxSize={6} m={2} />
            <MoreCircleIcon boxSize={6} m={2} />
            <PlusIcon boxSize={6} m={2} />
            <SearchIcon boxSize={6} m={2} />
            <MenuIcon boxSize={6} m={2} />
            <LocationIcon boxSize={6} m={2} />
            <FacebookIcon boxSize={6} m={2} />
            <InstagramIcon boxSize={6} m={2} />
            <YoutubeIcon boxSize={6} m={2} />
            <EyeIcon boxSize={6} m={2} />
            <CrossEyeIcon boxSize={6} m={2} />
            <CategoryIcon boxSize={6} m={2} />
            <EditIcon boxSize={6} m={2} />
            <DeleteIcon boxSize={6} m={2} />
            <DotsMenuIcon boxSize={6} m={2} />
            <UnpublishIcon boxSize={6} m={2} />
            <PublishIcon boxSize={6} m={2} />
            <FilterIcon boxSize={6} m={2} />
        </Box>
        <Box>
            <MusicIcon boxSize={16} m={4} />
            <MusicColoredIcon boxSize={16} m={4} />
            <BusinessIcon boxSize={16} m={4} />
            <BusinessColoredIcon boxSize={16} m={4} />
            <TravelIcon boxSize={16} m={4} />
            <TravelColoredIcon boxSize={16} m={4} />
            <LearningIcon boxSize={16} m={4} />
            <LearningColoredIcon boxSize={16} m={4} />
        </Box>
        <Box>
            <SportIcon boxSize={16} m={4} />
            <SportColoredIcon boxSize={16} m={4} />
            <EventIcon boxSize={16} m={4} />
            <EventColoredIcon boxSize={16} m={4} />
            <ChildrenIcon boxSize={16} m={4} />
            <ChildrenColoredIcon boxSize={16} m={4} />
            <GameIcon boxSize={16} m={4} />
            <GameColoredIcon boxSize={16} m={4} />
        </Box>
    </>
);
