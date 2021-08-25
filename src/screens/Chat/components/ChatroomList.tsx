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
        if (status === IChatroomStatus.REJECTED && IChatroomNotificationType.CHANGE_STATUS === notificationType) {
            return Type.REJECTED;
        }
        if (status === IChatroomStatus.APPROVED && IChatroomNotificationType.CHANGE_STATUS === notificationType) {
            return Type.APPROVED;
        }
        return Type.DEFAULT;
    };

    const getUnreadMessageAmount = (notificationType: IChatroomNotificationType, unreadMessageAmount: number) =>
        notificationType === IChatroomNotificationType.CREATE_CHATROOM ? 1 : unreadMessageAmount;

    return (
        <>
            {chatroomList.map((chatroom, index) => {
                const { companion, created, id, notificationType, proposal, status } = chatroom;

                const prevCreatedDate = chatroomList[index - 1]?.created;
                const address = `${proposal.city.name}, ${proposal.cityArea.name}`;
                const lastMessageTime = toLocaleTimeString(chatroom.created, DEFAULT_LOCALE);
                const type = getMessageBoxType(notificationType, status);
                const unreadMessageAmount = getUnreadMessageAmount(
                    chatroom.notificationType,
                    chatroom.unreadMessageAmount
                );
                const userName = getUserName(companion.firstName, companion.lastName, companion.username);
                const handleTitleClick = () => onTitleClick(id);
                const handleUserNameClick = () => onUsernameCkick(chatroom.companion.id);

                return (
                    <Fragment key={id}>
                        <DateTitle prevCreatedDate={prevCreatedDate} currentCreatedDate={created} />

                        <MessageBox
                            address={address}
                            categoryColor={proposal.category.color}
                            categoryName={proposal.category.name}
                            lastMessageTime={lastMessageTime}
                            title={proposal.title}
                            type={type}
                            unreadMessageAmount={unreadMessageAmount}
                            userAvatarUrl={companion.avatar}
                            userName={userName}
                            onTitleClick={handleTitleClick}
                            onUserNameClick={handleUserNameClick}
                        />
                    </Fragment>
                );
            })}
        </>
    );
};

export default ChatroomList;
