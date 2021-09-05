import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { CloseIcon, TickIcon } from '@theme/customIcons';

interface IProps {
    message: string;
    sentTime: string;
    author?: string;
    showControls?: boolean;
    isRejectLoading?: boolean;
    isApproveLoading?: boolean;
    onApprove?: () => void;
    onReject?: () => void;
}
// TODO extract accept reject functionality from this component
const Message = ({
    author,
    message,
    sentTime,
    showControls,
    onApprove,
    onReject,
    isRejectLoading = false,
    isApproveLoading = false,
}: IProps) => {
    const showApprovedControls = onReject && onApprove && showControls;

    return (
        <Box alignSelf={author ? 'flex-start' : 'flex-end'} width="80%">
            <Flex justify="space-between" mb={1}>
                <Text color={author ? 'orange.500' : 'gray.800'} fontSize="xs" fontWeight="bold">
                    {author || 'Twoja wiadomość'}
                </Text>
                <Text fontSize="xs">{sentTime}</Text>
            </Flex>
            <Box bgColor={author ? 'orange.50' : 'gray.50'} borderWidth={1} borderRadius="lg" px={4} py={2}>
                <Text>{message}</Text>

                {showApprovedControls && (
                    <Flex justifyContent="space-between" mt={4} mb={2}>
                        <Button
                            isDisabled={isRejectLoading || isApproveLoading}
                            isLoading={isRejectLoading}
                            colorScheme="red"
                            rightIcon={<CloseIcon />}
                            onClick={onReject}
                        >
                            Odrzuć
                        </Button>
                        <Button
                            isDisabled={isRejectLoading || isApproveLoading}
                            isLoading={isApproveLoading}
                            colorScheme="orange"
                            rightIcon={<TickIcon />}
                            onClick={onApprove}
                        >
                            Zaakceptuj
                        </Button>
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export default Message;
