import React from 'react';

import { Heading, IconButton, Flex, Link, SimpleGrid } from '@chakra-ui/react';
import { BRAND_NAME } from '@config/app';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@theme/customIcons';

export const Footer: React.FC = () => (
    <Flex
        as="footer"
        align="center"
        bgColor="gray.100"
        justify="center"
        flexDir="column"
        padding={8}
        paddingBottom={{ base: 24, md: 8 }}
    >
        <Flex align="center" flexDir="column" mb={7}>
            <Heading as="h2" color="gray.400" marginBottom={2} size="lg" textAlign="center">
                {BRAND_NAME}
            </Heading>
            <SimpleGrid as="nav" columns={3} spacing={4} maxW="10rem">
                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Instagram"
                    icon={<InstagramIcon fontSize={28} />}
                />
                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Facebook"
                    icon={<FacebookIcon fontSize={28} />}
                />
                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Youtube"
                    icon={<YoutubeIcon fontSize={28} />}
                />
            </SimpleGrid>
        </Flex>

        <Flex as="nav" align="center" flexDir={{ base: 'column', md: 'row' }} justify="space-between">
            <Link color="gray.400" marginX={4} marginBottom={{ base: 4, md: 0 }}>
                Regulamin
            </Link>
            <Link color="gray.400" marginX={4} marginBottom={{ base: 4, md: 0 }}>
                Polityka prywatności
            </Link>
            <Link color="gray.400" marginX={4}>
                Jak działa {BRAND_NAME}?
            </Link>
        </Flex>
    </Flex>
);
