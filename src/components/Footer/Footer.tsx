import React from 'react';

import { Heading, IconButton, Flex, Link, SimpleGrid } from '@chakra-ui/core';
import { BRAND_NAME } from '@src/config';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@theme/customIcons';

export const Footer: React.FC = () => (
    <Flex
        as="footer"
        backgroundColor="gray.100"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
        padding={8}
        paddingBottom={{ base: 24, md: 8 }}
    >
        <Flex alignItems="center" flexDirection="column" marginBottom={{ base: 6, md: 0 }}>
            <Heading as="h2" color="gray.400" marginBottom={2} size="lg" textAlign="center">
                PartnerDo
            </Heading>
            <SimpleGrid as="nav" columns={3} spacing={4} maxWidth="10rem">
                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Instagram"
                    icon={<InstagramIcon fontSize={32} />}
                />

                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Facebook"
                    icon={<FacebookIcon fontSize={32} />}
                />

                <IconButton
                    color="gray.400"
                    variant="unstyled"
                    aria-label="Youtube"
                    icon={<YoutubeIcon fontSize={32} />}
                />
            </SimpleGrid>
        </Flex>

        <Flex as="nav" alignItems="center" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between">
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
