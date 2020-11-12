import React, { useState } from 'react';

import { InputGroup, Input, IconButton, InputRightElement } from '@chakra-ui/core';
import { CrossEyeIcon, EyeIcon } from '@theme/customIcons';

interface IProps {
    placeholder: string;
}

export const PasswordField: React.FC<IProps> = ({ placeholder }) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const handleClick = () => setIsShown((prevState) => !prevState);

    return (
        <InputGroup mb={{ base: 4, md: 8 }}>
            <Input type={isShown ? 'text' : 'password'} size="lg" placeholder={placeholder} />
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
};
