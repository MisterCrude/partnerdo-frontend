import { useState } from 'react';
import { getCategoriesSelector, getCitiesSelector, getCityAreasSelector } from '@selectors/filterSelectors';
import { IOption } from '@typing/app';
import { IProposal } from '@typing/proposal';
import { toOptions } from '@utils/convert';
import { updateProfileProposalAsync } from '@slices/profileSlice';
import { getProfileProposalsUpdateRequestStatusSelector } from '@selectors/profileSelectors';
import { useMount } from 'react-use';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import EditProposalForm, { IInputs } from '../components/EditProposalForm';

interface IProps {
    proposal: IProposal;
    onClose: () => void;
}

const EditProposalModule = ({ proposal, onClose }: IProps) => {
    const [cityAreaOptions, setCityAreaOptions] = useState<IOption[]>([]);

    const submitForm = useDispatch<{ id: string; formData: IInputs }>(updateProfileProposalAsync);
    const categories = useSelector(getCategoriesSelector);
    const cities = useSelector(getCitiesSelector);
    const profileProposalsUpdateRequestStatus = useSelector(getProfileProposalsUpdateRequestStatusSelector);
    const getCityAreas = useSelector(getCityAreasSelector);

    const categoryOptions = toOptions(categories);
    const cityOptions = toOptions(cities);

    const handleChangeCity = (cityId: string) => {
        const cityAreas = getCityAreas(cityId);
        setCityAreaOptions(toOptions(cityAreas));
    };

    const handleSubmit = (formData: IInputs) => {
        submitForm({ id: proposal.id, formData });
    };

    useMount(() => {
        const cityAreas = getCityAreas(proposal.city.id);
        setCityAreaOptions(toOptions(cityAreas));
    });

    return (
        <>
            <EditProposalForm
                requestStatus={profileProposalsUpdateRequestStatus}
                defaultData={proposal}
                categoryOptions={categoryOptions}
                cityOptions={cityOptions}
                cityAreaOptions={cityAreaOptions}
                onChengeCity={handleChangeCity}
                onSubmit={handleSubmit}
                onClose={onClose}
            />
        </>
    );
};

export default EditProposalModule;
