import React, { useState } from 'react';
import { merge, some, values } from 'lodash/fp';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import { createProposalAsync } from '@slices/proposalSlice';
import { getCitiesSelector, getCityAreasSelector, getCategoriesSelector } from '@slices/filtersSlice';
import { getCreateRequestStatusSelector } from '@slices/proposalSlice';
import { IProposal } from '@models/proposal';
import { RequestStatus } from '@models/misc';
import { ROUTES } from '@consts/routes';
import { toOptions } from '@utils/convert';
import useDispatch from '@hooks/useDispatch';

import { Heading, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';
import StepOne from './components/StepOne';
import StepThreeForm from './components/StepThreeForm';
import StepTwo from './components/StepTwo';

const STEPS = [
    {
        title: 'Wybierz kategorię',
        path: `${ROUTES.PROPOSALS_CREATE}/step-one`,
    },
    {
        title: 'Wybierz lokalizację',
        path: `${ROUTES.PROPOSALS_CREATE}/step-two`,
    },
    {
        title: 'Opisz swoję partnerstwo',
        path: `${ROUTES.PROPOSALS_CREATE}/step-three`,
    },
];

/**
 * Get all keys from IProposal and set to IProposalFields with string value
 * Partial changes all of fields as optional
 */
type IProposalFields = Partial<{ [key in keyof IProposal]: string }>;

export const ProposalCreate: React.FC = () => {
    const createProposal = useDispatch(createProposalAsync);

    const [currentStep, setCurrentStep] = useState(0);
    const [proposalFields, setProposalFields] = useState<IProposalFields>({
        category: '',
        city: '',
        cityArea: '',
        title: '',
        description: '',
    });

    const categories = useSelector(getCategoriesSelector);
    const getCityAreas = useSelector(getCityAreasSelector);
    const cities = useSelector(getCitiesSelector);
    const createRequestStatus = useSelector(getCreateRequestStatusSelector);

    const history = useHistory();

    const cityOptions = toOptions(cities);
    const categoryOptions = toOptions(categories);

    const handleCancel = () => history.push(ROUTES.PROPOSALS);
    const handleGoNextStep = (step: number) => {
        setCurrentStep(step);
        history.push(STEPS[step].path);
    };
    const handleSaveFields = (fieldsData: Record<string, string>) =>
        setProposalFields((prevState) => merge({ ...prevState }, fieldsData));

    const handleSubmitForm = (fieldsData: Record<string, string>) => {
        const hasSomeEmptyFields = some((value: string) => value === '', values(fieldsData));
        handleSaveFields(fieldsData);

        !hasSomeEmptyFields && createProposal(merge({ ...proposalFields }, fieldsData));
    };

    useMount(() => history.push(STEPS[0].path));

    useUpdateEffect(() => {
        createRequestStatus === RequestStatus.SUCCESS && history.push(ROUTES.PROPOSALS);
    }, [createRequestStatus]);

    return (
        <Main d="flex" flexDir="column" flexGrow={1} maxW="3xl" mt={{ base: 0, md: 10 }} mb={10}>
            <Heading align="center" mb={10}>
                Nowe partnerstwo
            </Heading>

            <Text mb={4} fontWeight="light" fontSize="lg" align="center">
                <strong>Krok {currentStep + 1} z 3</strong> <br />
                {STEPS[currentStep].title}
            </Text>

            <Switch>
                <Route exact path={STEPS[0].path}>
                    <StepOne
                        categories={categoryOptions}
                        defaultData={proposalFields as Record<string, string>}
                        onCancel={handleCancel}
                        onChangeStep={handleGoNextStep}
                        onSave={handleSaveFields}
                    />
                </Route>
                <Route exact path={STEPS[1].path}>
                    <StepTwo
                        citires={cityOptions}
                        defaultData={proposalFields as Record<string, string>}
                        cityAreasGetter={getCityAreas}
                        onChangeStep={handleGoNextStep}
                        onSave={handleSaveFields}
                    />
                </Route>
                <Route exact path={STEPS[2].path}>
                    <StepThreeForm
                        defaultData={proposalFields as Record<string, string>}
                        requestStatus={createRequestStatus}
                        onSubmit={handleSubmitForm}
                        onBack={handleGoNextStep}
                    />
                </Route>
                <Redirect from={ROUTES.PROPOSALS_CREATE} to={STEPS[0].path} />
            </Switch>
        </Main>
    );
};
