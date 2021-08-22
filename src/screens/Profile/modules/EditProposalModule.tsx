import { useState } from 'react';
import { categoryListSelector, cityListSelector, cityAreaListSelector } from '@selectors/filterSelectors';
import { IOption } from '@typing/app';
import { IProposal } from '@typing/proposal';
import { toOptions } from '@utils/convert';
import { updateProfileProposalAsync } from '@slices/profileSlice';
import { profileProposalListUpdateRequestStatusSelector } from '@selectors/profileSelectors';
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
    const categoryList = useSelector(categoryListSelector);
    const cityList = useSelector(cityListSelector);
    const profileProposalListUpdateRequestStatus = useSelector(profileProposalListUpdateRequestStatusSelector);
    const getCityAreaList = useSelector(cityAreaListSelector);

    const categoryOptions = toOptions(categoryList);
    const cityOptions = toOptions(cityList);

    const handleChangeCity = (cityId: string) => {
        const cityAreas = getCityAreaList(cityId);
        setCityAreaOptions(toOptions(cityAreas));
    };

    const handleSubmit = (formData: IInputs) => {
        submitForm({ id: proposal.id, formData });
    };

    useMount(() => {
        const cityAreaList = getCityAreaList(proposal.city.id);
        setCityAreaOptions(toOptions(cityAreaList));
    });

    return (
        <>
            <EditProposalForm
                requestStatus={profileProposalListUpdateRequestStatus}
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
