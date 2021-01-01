import React from 'react';
import { Switch, Link as RouterLink, Route, Redirect, useLocation } from 'react-router-dom';

import { ROUTES } from '@config/app';

import { Box, Flex, Link } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import EditForm from './components/EditForm';
import History from './components/History';
import MyProposals from './components/MyProposals';

const LINKS = [
    {
        crumbs: [{ title: 'Strona główna', link: ROUTES.BROWSER }],
        title: 'Profil',
        link: ROUTES.PROFILE,
    },
    {
        crumbs: [
            { title: 'Strona główna', link: ROUTES.BROWSER },
            { title: 'Profil', link: ROUTES.PROFILE },
        ],
        title: 'Moje partnerstwa',
        link: ROUTES.PROFILE_MY_PROPOSALS,
    },
    {
        crumbs: [
            { title: 'Strona główna', link: ROUTES.BROWSER },
            { title: 'Profil', link: ROUTES.PROFILE },
        ],
        title: 'Zrealizowane partnerstwa',
        link: ROUTES.PROFILE_DONE_PROPOSALS,
    },
];

export const Profile: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            {LINKS.map(
                ({ crumbs, link, title }) =>
                    pathname === link && <Breadcrumbs current={title} crumbs={crumbs} key={link} />
            )}

            <Flex mx={{ base: -8, sm: 0 }} pl={{ base: 8, sm: 0 }} pb={{ base: 2, sm: 0 }} overflowX={{ base: 'auto' }}>
                <Box>
                    {LINKS.map(({ title, link }) => (
                        <Link
                            as={RouterLink}
                            to={link}
                            key={link}
                            whiteSpace="nowrap"
                            mr={10}
                            textDecor={link === pathname ? 'underline' : 'none'}
                            color={link === pathname ? 'gray.800' : 'gray.500'}
                            _focus={{
                                boxShadow: 'none',
                            }}
                        >
                            {title}
                        </Link>
                    ))}
                </Box>
            </Flex>

            <Box mt={8}>
                <Switch>
                    <Route exact component={EditForm} path={ROUTES.PROFILE} />
                    <Route exact component={MyProposals} path={ROUTES.PROFILE_MY_PROPOSALS} />
                    <Route exact component={History} path={ROUTES.PROFILE_DONE_PROPOSALS} />
                    <Redirect from="/*" to={ROUTES.NOT_FOUND} />
                </Switch>
            </Box>
        </Main>
    );
};
