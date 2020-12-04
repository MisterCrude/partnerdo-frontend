import React, { useState, forwardRef } from 'react';

import { InputGroup, Input, IconButton, InputProps, InputRightElement } from '@chakra-ui/react';
import { CrossEyeIcon, EyeIcon } from '@theme/customIcons';

type Ref = HTMLInputElement;

export const PasswordField = forwardRef<Ref, InputProps>((props, ref) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const handleClick = () => setIsShown((prevState) => !prevState);

    return (
        <InputGroup>
            <Input type={isShown ? 'text' : 'password'} ref={ref} {...props} />
            <InputRightElement h="100%">
                <IconButton
                    aria-label="Password"
                    color={isShown ? 'gray' : 'gray.400'}
                    icon={isShown ? <EyeIcon fontSize={24} /> : <CrossEyeIcon fontSize={24} />}
                    size="sm"
                    mr={2}
                    variant="unstyled"
                    onClick={handleClick}
                />
            </InputRightElement>
        </InputGroup>
    );
});
