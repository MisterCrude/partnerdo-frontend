import React from 'react';
import { Switch, Link as RouterLink, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMount } from 'react-use';
import { ROUTES } from '@consts/routes';
import useDispatch from '@hooks/useDispatch';
import {
    getProfileDataSelector,
    getProfileRequestStatusSelector,
    updateProfileAsync,
    fetchProfileProposalsAsync,
    getProfileProposalsSelector,
    getProfileProposalsRequestStatusSelector,
} from '@slices/profileSlice';

import { Box, Flex, Link } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import EditProfileForm, { IInputs } from './components/EditProfileForm';
import History from './components/History';
import MyProposals from './components/MyProposals';

const PROFILE_TABS = [
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
    const userData = useSelector(getProfileDataSelector);
    const requestStatus = useSelector(getProfileRequestStatusSelector);
    const profileProposals = useSelector(getProfileProposalsSelector);
    const profileProposalsRequestStatus = useSelector(getProfileProposalsRequestStatusSelector);

    const fetchProfileProposals = useDispatch<string>(fetchProfileProposalsAsync);
    const submitForm = useDispatch<IInputs>(updateProfileAsync);

    const { pathname } = useLocation();
    const history = useHistory();

    const handleSubmitForm = (updatedData: IInputs) => submitForm(updatedData);
    const handleProposalClick = (proposalId: string) => history.push(`${ROUTES.PROPOSALS}/${proposalId}`);

    useMount(() => {
        fetchProfileProposals(userData.id);
    });

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            {PROFILE_TABS.map(
                ({ crumbs, link, title }) =>
                    pathname === link && <Breadcrumbs current={title} crumbs={crumbs} key={link} />
            )}

            <Flex mx={{ base: -4, sm: 0 }} pl={{ base: 8, sm: 0 }} pb={{ base: 2, sm: 0 }} overflowX={{ base: 'auto' }}>
                <Box>
                    {PROFILE_TABS.map(({ tabTitle, link }) => (
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
                        <EditProfileForm
                            requestStatus={requestStatus}
                            formData={userData}
                            onSubmit={handleSubmitForm}
                        />
                    </Route>
                    <Route exact path={ROUTES.PROFILE_MY_PROPOSALS}>
                        <MyProposals
                            requestStatus={profileProposalsRequestStatus}
                            proposals={profileProposals}
                            onProposalClick={handleProposalClick}
                        />
                    </Route>
                    <Route exact component={History} path={ROUTES.PROFILE_DONE_PROPOSALS} />
                    <Redirect from="/*" to={ROUTES.NOT_FOUND} />
                </Switch>
            </Box>
        </Main>
    );
};
