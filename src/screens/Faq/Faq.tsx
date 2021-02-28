import React from 'react';

import { ROUTES } from '@consts/routes';

import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProps {
    isAuth?: boolean;
}

export const Faq: React.FC<IProps> = ({ isAuth = false }) => {
    return (
        <Main mt={{ base: 0, md: 10 }} mb={10} flexGrow={1}>
            <Breadcrumbs
                crumbs={[
                    {
                        title: isAuth ? 'Lista partnerstw' : 'Strona główna',
                        link: isAuth ? ROUTES.PROPOSALS : ROUTES.ROOT,
                    },
                ]}
                current="Jak działa PartnerDo?"
                mb={6}
            />
            <Box mb={10}>
                <Heading size="md" mb={8}>
                    Rejestracja
                </Heading>

                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Jak załoyć konto?
                            </Box>
                            <ChevronDownIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Jak załoyć konto?
                            </Box>
                            <ChevronDownIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>

            <Box mb={10}>
                <Heading size="md" mb={8}>
                    Coś tam jeszcze
                </Heading>

                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Jak załoyć konto?
                            </Box>
                            <ChevronDownIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Jak załoyć konto?
                            </Box>
                            <ChevronDownIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Jak załoyć konto?
                            </Box>
                            <ChevronDownIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Main>
    );
};
