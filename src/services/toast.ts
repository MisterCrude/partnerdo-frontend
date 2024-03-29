import { IToast, ToastPosition } from '@typing/app';
import { createStandaloneToast } from '@chakra-ui/react';
import { TOAST_DURATION } from '@consts/app';

const toast = (duration?: number | undefined, position?: ToastPosition | undefined) => {
    const toast = createStandaloneToast();

    return ({ status, title, message }: Omit<IToast, 'timestamp'>) =>
        toast({
            position: position ?? 'top-left',
            title,
            description: message,
            status,
            duration: duration ?? TOAST_DURATION,
            isClosable: true,
        });
};

export default toast;
