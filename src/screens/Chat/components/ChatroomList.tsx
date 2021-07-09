import { Fragment } from 'react';
import { DEFAULT_LOCALE } from '@consts/app';
import { getUserName } from '@utils/user';
import { IChatroom } from '@typing/chat';
import { toLocaleTimeString } from '@utils/convert';

import MessageBox, { Types } from './MessageBox';
import DateTitle from './DateTitle';

interface IProps {
    profileId: string;
    chatroomList: IChatroom[];
    onTitleClick: (chatroomId: string) => void;
    onUsernameCkick: (authorId: string) => void;
}

export const ChatroomList = ({ chatroomList, profileId, onUsernameCkick, onTitleClick }: IProps) => {
    return (
        <>
            {chatroomList.map(
                (
                    {
                        id,
                        created,
                        unreadMessageNumber,
                        proposal: { title, category, city, cityArea },
                        proposalAuthor: {
                            id: authorId,
                            avatar: authorAvatar,
                            firstName: authorFirstName,
                            lastName: authorLastName,
                            username: authorUsername,
                        },
                        initiator: {
                            avatar: initiatorAvatar,
                            id: initiatorId,
                            firstName: initiatorFirstName,
                            lastName: initiatorLastName,
                            username: initiatorUsername,
                        },
                    },
                    index
                ) => (
                    <Fragment key={id}>
                        <DateTitle prevCreatedDate={chatroomList[index - 1]?.created} currentCreatedDate={created} />

                        {profileId === authorId ? (
                            <MessageBox
                                type={Types.SECONDARY}
                                subtitle="Masz propozycje od"
                                address={`${city.name}, ${cityArea.name}`}
                                categoryColor={category.color}
                                categoryName={category.name}
                                lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                                newMessagesAmount={unreadMessageNumber}
                                onTitleClick={() => onTitleClick(id)}
                                onUserNameClick={() => onUsernameCkick(initiatorId)}
                                title={title}
                                userAvatarUrl={initiatorAvatar}
                                userName={getUserName(initiatorFirstName, initiatorLastName, initiatorUsername)}
                            />
                        ) : (
                            <MessageBox
                                address={`${city.name}, ${cityArea.name}`}
                                categoryColor={category.color}
                                categoryName={category.name}
                                lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                                newMessagesAmount={unreadMessageNumber}
                                onTitleClick={() => onTitleClick(id)}
                                onUserNameClick={() => onUsernameCkick(authorId)}
                                title={title}
                                userAvatarUrl={authorAvatar}
                                userName={getUserName(authorFirstName, authorLastName, authorUsername)}
                            />
                        )}
                    </Fragment>
                )
            )}
        </>
    );
};

export default ChatroomList;
