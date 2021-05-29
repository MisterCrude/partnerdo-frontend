import React from 'react';
import { DEFAULT_LOCALE } from '@consts/app';
import {
    fetchPageAsync,
    getChatRoomsPageRequestStatusSelector,
    getCurrentPageChatRoomsSelector,
    getPagesAmountSelector,
} from '@slices/chatRoomsSlice';
import { getUserName } from '@utils/user';
import { RequestStatus } from '@models/misc';
import { ROUTES } from '@consts/routes';
import { scrollTop } from '@utils/misc';
import { toLocaleTimeString } from '@utils/convert';
import { useHistory } from 'react-router';
import { useMount } from 'react-use';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import { Flex, VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Breadcrumbs from '@components/Breadcrumbs';
import MessageBox from './components/MessageBox';

export const Chat: React.FC = () => {
    const history = useHistory();

    const requestStatus = useSelector(getChatRoomsPageRequestStatusSelector);
    const chatRooms = useSelector(getCurrentPageChatRoomsSelector);
    const pagesAmount = useSelector(getPagesAmountSelector);
    const fetchPage = useDispatch<number>(fetchPageAsync);

    const handleUserNameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = (chatRoomId: string) => history.push(`${ROUTES.CHAT}/${chatRoomId}`);

    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;
    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;

    const handleChangePage = () => scrollTop();

    useMount(() => {
        fetchPage();
    });

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]} current="Wiadomości" mb={6} />

            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <>
                    {/* TODO move it to Results component like in Browser.tsx */}
                    <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
                        {/* <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Wczoraj
                </Text> */}
                        {/* 
                    id: string;
                    initiator: Omit<IProfile, 'birthYear' | 'description' | 'gender'>;
                    proposalAuthor: Omit<IProfile, 'birthYear' | 'description' | 'gender'>;
                    proposal: Omit<IProposal, 'author'>;
                    status: string;
                    chatroom: string;
                    lastMessage: string;
                    created: string;
                    message: string; 
                */}
                        {chatRooms.map(
                            ({
                                id,
                                created,
                                unreadMessageNumber,
                                proposal: { title, category, city, cityArea },
                                proposalAuthor: { id: authorId, avatar, firstName, lastName, username },
                            }) => (
                                <MessageBox
                                    key={id}
                                    address={`${city.name}, ${cityArea.name}`}
                                    categoryColor={category.color}
                                    categoryName={category.name}
                                    lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                                    newMessagesAmount={unreadMessageNumber}
                                    onTitleClick={() => handleTitleClick(id)}
                                    onUserNameClick={() => handleUserNameClick(authorId)}
                                    title={title}
                                    userAvatarUrl={avatar}
                                    userName={getUserName(firstName, lastName, username)}
                                />
                            )
                        )}
                        {/* <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Yszukuję partnera do głębolenistwakiego lenistwa"
                    categoryName="Biznes"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=1"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                    newMessagesAmount={3}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuj do głębokiego lenistwa"
                    categoryName="Spors"
                    userName="Janina Barabanina"
                    userAvatarUrl="https://i.pravatar.cc/300?u=2"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                    newMessagesAmount={4}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do glenistwałębokiego lenistwa"
                    categoryName="Sport"
                    userName="Ged Breg"
                    subtitle="wysłał Ci prpozycję na twoje partnerstwo"
                    userAvatarUrl="https://i.pravatar.cc/300?u=3"
                    newMessagesAmount={4}
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                    type={Types.SECONDARY}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partneralenistwa"
                    categoryName="Sport"
                    userName="Angus Jangus"
                    userAvatarUrl="https://i.pravatar.cc/300?u=4"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                    type={Types.REJECTED}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do głębokiego lenistwa"
                    categoryName="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=5"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                    type={Types.REJECTED}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnerlen istwaleni stwalenistwalenis twanistwa"
                    categoryName="Sport"
                    subtitle="wysłał Ci prpozycję na twoje partnerstwo"
                    userName="John John"
                    userAvatarUrl="https://i.pravatar.cc/300?u=6"
                    type={Types.SECONDARY}
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Wtorek 23.12.20
                </Text>
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do głęistwa"
                    categoryName="Dzieci"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=7"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do głębokiego lenistwa"
                    categoryName="Myzyka"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=8"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do głębokiego ębokiego lenistwa"
                    categoryName="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=9"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Sobota 12.12.20
                </Text>
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera do lenistwal enistwa wa"
                    categoryName="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=10"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                />
                <MessageBox
                    address=""
                    lastMessageTime=""
                    title="Poszukuję partnera ębokiego ębokiego ębokiego enistwa"
                    categoryName="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=11"
                    onTitleClick={() => handleTitleClick('')}
                    onUserNameClick={() => handleUserNameClick('')}
                /> */}
                    </VStack>
                </>
            )}
            <Flex justify="center" mt={10}>
                <Pagination isFetching={showSkeleton} onChangePage={handleChangePage} pagesAmount={pagesAmount} />
            </Flex>
        </Main>
    );
};
