import { IToast, TPosition } from '@models/app';
import { createStandaloneToast } from '@chakra-ui/react';
import { TOAST_DURATION } from '@config/app';

const toast = (duration?: number | undefined, position?: TPosition | undefined) => {
    const toast = createStandaloneToast();

    return ({ status, title, message }: Omit<IToast, 'timestamp'>) =>
        toast({
            position: position ?? 'top-right',
            title,
            description: message,
            status,
            duration: duration ?? TOAST_DURATION,
            isClosable: true,
        });
};

export default toast;
