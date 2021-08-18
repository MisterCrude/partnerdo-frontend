import { Fragment } from 'react';
import { DEFAULT_LOCALE } from '@consts/app';
import { getUserName } from '@utils/user';
import { IChatroom, IChatroomNotificationType, IChatroomStatus } from '@typing/chat';
import { toLocaleTimeString } from '@utils/convert';

import MessageBox, { Type } from './MessageBox';
import DateTitle from './DateTitle';

interface IProps {
    profileId: string;
    chatroomList: IChatroom[];
    onTitleClick: (chatroomId: string) => void;
    onUsernameCkick: (authorId: string) => void;
}

export const ChatroomList = ({ chatroomList, profileId, onUsernameCkick, onTitleClick }: IProps) => {
    const getMessageBoxType = (notificationType: IChatroomNotificationType, status: IChatroomStatus) => {
        console.log(notificationType, status);
        // DEFAULT = 'default',
        // REJECTED = 'rejected',
        // APPROVED = 'approved',
        //
        //
        // IDLE = 'ID',
        // NEW_MESSAGE = 'NM',
        // CHANGE_STATUS = 'CS',
        // CREATE_CHATROOM = 'CM',

        if (status === IChatroomStatus.REJECTED) return Type.REJECTED;
        if (status === IChatroomStatus.APPROVED) return Type.APPROVED;
        return Type.DEFAULT;
    };

    return (
        <>
            {chatroomList.map(
                (
                    {
                        id,
                        created,
                        unreadMessageNumber: unreadMessagesAmount,
                        proposal: { title, category, city, cityArea },
                        notificationType,
                        proposalAuthor: {
                            id: authorId,
                            avatar: authorAvatar,
                            firstName: authorFirstName,
                            lastName: authorLastName,
                            username: authorUsername,
                        },
                        status,
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
                            <>sss</>
                        ) : (
                            // <MessageBox
                            //     type={Type.SECONDARY}
                            //     subtitle="Masz propozycje od"
                            //     address={`${city.name}, ${cityArea.name}`}
                            //     categoryColor={category.color}
                            //     categoryName={category.name}
                            //     lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                            //     unreadMessagesAmount={unreadMessagesAmount}
                            //     onTitleClick={() => onTitleClick(id)}
                            //     onUserNameClick={() => onUsernameCkick(initiatorId)}
                            //     title={title}
                            //     userAvatarUrl={initiatorAvatar}
                            //     userName={getUserName(initiatorFirstName, initiatorLastName, initiatorUsername)}
                            // />
                            <MessageBox
                                type={getMessageBoxType(notificationType, status)}
                                address={`${city.name}, ${cityArea.name}`}
                                categoryColor={category.color}
                                categoryName={category.name}
                                lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                                unreadMessagesAmount={unreadMessagesAmount}
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
