import React from 'react';
import { Switch, Link as RouterLink, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES } from '@consts/routes';
import { getUserDataSelector } from '@slices/userSlice';

import { Box, Flex, Link } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import EditForm from './components/EditForm';
import History from './components/History';
import MyProposals from './components/MyProposals';

const LINKS = [
    {
        crumbs: [{ title: 'Strona główna', link: ROUTES.PROPOSALS }],
        title: 'Profil',
        tabTitle: 'Edycja profilu',
        link: ROUTES.PROFILE,
    },
    {
        crumbs: [
            { title: 'Strona główna', link: ROUTES.PROPOSALS },
            { title: 'Profil', link: ROUTES.PROFILE },
        ],
        tabTitle: 'Moje partnerstwa',
        title: 'Moje partnerstwa',
        link: ROUTES.PROFILE_MY_PROPOSALS,
    },
    {
        crumbs: [
            { title: 'Strona główna', link: ROUTES.PROPOSALS },
            { title: 'Profil', link: ROUTES.PROFILE },
        ],
        tabTitle: 'Zrealizowane partnerstwa',
        title: 'Zrealizowane partnerstwa',
        link: ROUTES.PROFILE_DONE_PROPOSALS,
    },
];

export const Profile: React.FC = () => {
    const userData = useSelector(getUserDataSelector);
    const { pathname } = useLocation();

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            {LINKS.map(
                ({ crumbs, link, title }) =>
                    pathname === link && <Breadcrumbs current={title} crumbs={crumbs} key={link} />
            )}

            <Flex mx={{ base: -4, sm: 0 }} pl={{ base: 8, sm: 0 }} pb={{ base: 2, sm: 0 }} overflowX={{ base: 'auto' }}>
                <Box>
                    {LINKS.map(({ tabTitle, link }) => (
                        <Link
                            _last={{ mr: { base: 10, sm: 8 } }}
                            _focus={{
                                boxShadow: 'none',
                            }}
                            as={RouterLink}
                            color={link === pathname ? 'gray.800' : 'gray.500'}
                            key={link}
                            mr={10}
                            textDecor={link === pathname ? 'underline' : 'none'}
                            to={link}
                            whiteSpace="nowrap"
                        >
                            {tabTitle}
                        </Link>
                    ))}
                </Box>
            </Flex>

            <Box mt={8}>
                <Switch>
                    <Route exact path={ROUTES.PROFILE}>
                        <EditForm {...userData} />
                    </Route>
                    <Route exact component={MyProposals} path={ROUTES.PROFILE_MY_PROPOSALS} />
                    <Route exact component={History} path={ROUTES.PROFILE_DONE_PROPOSALS} />
                    <Redirect from="/*" to={ROUTES.NOT_FOUND} />
                </Switch>
            </Box>
        </Main>
    );
};
