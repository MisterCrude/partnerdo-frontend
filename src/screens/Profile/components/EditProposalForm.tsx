import { useState } from 'react';
import { IProposal } from '@typing/proposal';
import { useForm } from 'react-hook-form';
import { useMount, useUpdateEffect } from 'react-use';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestStatus } from '@typing/api';
import * as yup from 'yup';
import { isEqual, pick } from 'lodash/fp';

import { Box, Flex, Textarea, Input, Button } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';
import MenuSelect from '@components/MenuSelect';

export interface IInputs {
    category: string;
    city: string;
    cityArea: string;
    description: string;
    title: string;
}

interface IProps {
    requestStatus: RequestStatus;
    defaultData: IProposal;
    categoryOptions: any[];
    cityOptions: any[];
    cityAreaOptions: any[];
    onChengeCity: (cityId: string) => void;
    onSubmit: (formData: IInputs) => void;
    onClose: () => void;
}

const validationSchema = yup.object().shape({
    title: yup.string().required('To pole jest wymagane').max(100, 'Maksymalna ilość znaków 100'),
    description: yup.string().required('To pole jest wymagane').max(800, 'Maksymalna ilość znaków 800'),
});

const EditProposalForm = ({
    requestStatus,
    categoryOptions,
    cityOptions,
    cityAreaOptions,
    defaultData,
    onChengeCity,
    onSubmit,
    onClose,
}: IProps) => {
    const { title, description, category: defaultCategory, city: defaultCity, cityArea: defaultCityArea } = defaultData;

    const [category, setCategory] = useState(defaultCategory.id);
    const [city, setCity] = useState(defaultCity.id);
    const [cityArea, setCityArea] = useState(defaultCityArea.id);
    const [isFormChanged, setIsFormChanged] = useState({ selects: false, inputs: false });

    const isDisableSubmit = !isFormChanged.selects && !isFormChanged.inputs;

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    const handleSelect = (name: string, value: string) => {
        setValue(name as keyof IInputs, value);

        if (name === 'city') {
            onChengeCity(value);
            setCity(value);
        }
        if (name === 'category') {
            setCategory(value);
        }
        if (name === 'cityArea') {
            setCityArea(value);
        }

        const isSelectsChanged = !isEqual(
            { category: defaultCategory.id, cityArea: defaultCityArea.id, city: defaultCity.id },
            pick(['category', 'cityArea', 'city'], getValues())
        );

        setIsFormChanged((prevState) => ({ ...prevState, selects: isSelectsChanged }));
    };

    const handleChange = () => {
        const isInputsChnged = !isEqual(
            pick(['title', 'description'], defaultData),
            pick(['title', 'description'], getValues())
        );

        setIsFormChanged((prevState) => ({ ...prevState, inputs: isInputsChnged }));
    };

    useMount(() => {
        register('category');
        register('city');
        register('cityArea');

        setValue('category', defaultCategory.id);
        setValue('city', defaultCity.id);
        setValue('cityArea', defaultCityArea.id);
    });

    useUpdateEffect(() => {
        requestStatus === RequestStatus.SUCCESS && setIsFormChanged({ selects: false, inputs: false });
    }, [requestStatus]);

    const isFetching = requestStatus === RequestStatus.FETCHING;

    return (
        <Flex as="form" flexDir="column" d={{ base: 'block', md: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.title ? 'tomato' : 'gray.200'}
                    defaultValue={title}
                    name="title"
                    placeholder="Tytuł partnerstwa"
                    ref={register}
                    size="lg"
                    type="text"
                    onChange={handleChange}
                />
                <FormErrorMessage name="title" errors={errors} />
            </Box>
            <Box mb={{ base: 4, md: 8 }}>
                <MenuSelect
                    options={categoryOptions}
                    palceholder="Kategoria"
                    name="category"
                    selected={category}
                    onChange={handleSelect}
                />
            </Box>
            <Box mb={{ base: 4, md: 8 }}>
                <MenuSelect
                    options={cityOptions}
                    palceholder="Miasto"
                    name="city"
                    selected={city}
                    onChange={handleSelect}
                />
            </Box>
            <Box mb={{ base: 4, md: 8 }}>
                <MenuSelect
                    options={cityAreaOptions}
                    palceholder="Dzielnica"
                    name="cityArea"
                    selected={cityArea}
                    onChange={handleSelect}
                />
            </Box>
            <Box mb={{ base: 4, md: 8 }}>
                <Textarea
                    borderColor={errors.description ? 'tomato' : 'gray.200'}
                    defaultValue={description}
                    h={40}
                    name="description"
                    placeholder="Opis partnerstwa"
                    ref={register}
                    resize="none"
                    size="lg"
                    type="text"
                    onChange={handleChange}
                />
                <FormErrorMessage name="description" errors={errors} />
            </Box>

            <Flex justifyContent={{ base: 'center', md: 'space-between' }} pt={3}>
                <Button onClick={onClose} flexGrow={{ base: 1, md: 0 }} mr={4}>
                    Zamknij
                </Button>
                <Button
                    isLoading={isFetching}
                    colorScheme="orange"
                    disabled={isDisableSubmit}
                    flexGrow={{ base: 1, md: 0 }}
                    ml={4}
                    type="submit"
                >
                    Zapisz
                </Button>
            </Flex>
        </Flex>
    );
};

export default EditProposalForm;
