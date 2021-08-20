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

export const ChatroomList = ({ chatroomList, onUsernameCkick, onTitleClick }: IProps) => {
    const getMessageBoxType = (notificationType: IChatroomNotificationType, status: IChatroomStatus) => {
        // DEFAULT = 'default',
        // REJECTED = 'rejected',
        // APPROVED = 'approved',
        //
        //
        // IDLE = 'ID',
        // NEW_MESSAGE = 'NM',
        // CHANGE_STATUS = 'CS',
        // CREATE_CHATROOM = 'CM',

        if (status === IChatroomStatus.REJECTED && IChatroomNotificationType.CHANGE_STATUS === notificationType) {
            return Type.REJECTED;
        }
        if (status === IChatroomStatus.APPROVED && IChatroomNotificationType.CHANGE_STATUS === notificationType) {
            return Type.APPROVED;
        }
        return Type.DEFAULT;
    };

    return (
        <>
            {chatroomList.map(
                (
                    {
                        companion: { id: companionId, avatar, firstName, lastName, username },
                        created,
                        id,
                        notificationType,
                        proposal: { title, category, city, cityArea },
                        status,
                        unreadMessageAmount,
                    },
                    index
                ) => (
                    <Fragment key={id}>
                        <DateTitle prevCreatedDate={chatroomList[index - 1]?.created} currentCreatedDate={created} />

                        <MessageBox
                            address={`${city.name}, ${cityArea.name}`}
                            categoryColor={category.color}
                            categoryName={category.name}
                            lastMessageTime={toLocaleTimeString(created, DEFAULT_LOCALE)}
                            title={title}
                            type={getMessageBoxType(notificationType, status)}
                            unreadMessageAmount={unreadMessageAmount}
                            userAvatarUrl={avatar}
                            userName={getUserName(firstName, lastName, username)}
                            onTitleClick={() => onTitleClick(id)}
                            onUserNameClick={() => onUsernameCkick(companionId)}
                        />
                    </Fragment>
                )
            )}
        </>
    );
};

export default ChatroomList;
