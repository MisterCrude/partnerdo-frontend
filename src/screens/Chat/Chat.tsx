import { getProfileDataSelector } from '@slices/profileSlice';
import { RequestStatus } from '@typing/api';
import { getChatroomListRequestStatusMapSelector, getChatroomListSelector } from '@slices/chatroomsSlice';
import { ROUTES } from '@consts/routes';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import ChatroomList from './components/ChatroomList';

export const Chat = () => {
    const history = useHistory();

    const requestStatus = useSelector(getChatroomListRequestStatusMapSelector);
    const chatroomList = useSelector(getChatroomListSelector);
    const { id: profileId } = useSelector(getProfileDataSelector);

    const handleUsernameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = (chatroomId: string) => history.push(`${ROUTES.CHAT}/${chatroomId}`);

    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;
    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]} current="Wiadomości" mb={6} />

            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <>
                    <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
                        <ChatroomList
                            chatroomList={chatroomList}
                            profileId={profileId}
                            onTitleClick={handleTitleClick}
                            onUsernameCkick={handleUsernameClick}
                        />
                    </VStack>
                </>
            )}
        </Main>
    );
};
