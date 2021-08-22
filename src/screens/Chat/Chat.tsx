import { profileSelector } from '@selectors/profileSelectors';
import { RequestStatus } from '@typing/api';
import { chatroomListRequestStatusSelector, chatroomListSelector } from '@selectors/chatroomSelectors';
import { ROUTES } from '@consts/routes';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import ChatroomList from './components/ChatroomList';

export const Chat = () => {
    const history = useHistory();

    const chatroomListRequestStatus = useSelector(chatroomListRequestStatusSelector);
    const chatroomList = useSelector(chatroomListSelector);
    const { id: profileId } = useSelector(profileSelector);

    const handleUsernameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = (chatroomId: string) => history.push(`${ROUTES.CHAT}/${chatroomId}`);

    const showError = chatroomListRequestStatus === RequestStatus.ERROR;
    const showContent = chatroomListRequestStatus === RequestStatus.SUCCESS;
    const showSkeleton =
        chatroomListRequestStatus === RequestStatus.FETCHING || chatroomListRequestStatus === RequestStatus.IDLE;

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
