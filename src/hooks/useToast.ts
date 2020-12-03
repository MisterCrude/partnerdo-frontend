import { useToast as useToasChakra } from '@chakra-ui/core';

import { IAlert } from '@models/app';
import { TOAST_DURATION } from '@config/app';

const useToast = (): typeof showToast => {
    const toast = useToasChakra();

    const showToast = ({ title, message, status }: IAlert): void => {
        if (title && message && status) {
            toast({
                position: 'bottom-right',
                title,
                description: message,
                status,
                duration: TOAST_DURATION,
                isClosable: true,
            });
        }
    };

    return showToast;
};

export default useToast;
