import { Text } from '@chakra-ui/react';
import { IChatroomStatus } from '@typing/chat';

interface IProps {
    status: IChatroomStatus;
    isShow?: boolean;
    isOwn?: boolean;
}

export const Notification = ({ status, isShow = true, isOwn = false }: IProps) => {
    if (!isShow) return null;

    return (
        <>
            {isOwn && (
                <>
                    {status === IChatroomStatus.REJECTED && (
                        <Text align="center" bgColor="red.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                            Ta propozycja została przez Ciebie odrzucona
                        </Text>
                    )}
                </>
            )}

            {!isOwn && (
                <>
                    {status === IChatroomStatus.IDLE && (
                        <Text align="center" bgColor="orange.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                            Musisz poczekać na akceptację użytkownika &nbsp;
                        </Text>
                    )}
                    {status === IChatroomStatus.REJECTED && (
                        <Text align="center" bgColor="red.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                            Twoja propozycja została odrzucona
                        </Text>
                    )}
                    {status === IChatroomStatus.APPROVED && (
                        <Text align="center" bgColor="green.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                            Twoja propozycja została zaakceptowana, teraz mozesz napisać do tego użytkownika
                        </Text>
                    )}
                </>
            )}
        </>
    );
};

export default Notification;
