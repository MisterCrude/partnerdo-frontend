import useDispatch from '@hooks/useDispatch';
import { IProposal } from '@typing/proposal';
import { IProposalRemove, removeProfileProposalAsync } from '@slices/profileSlice';

import { Button, Flex } from '@chakra-ui/react';

interface IProps {
    proposal: IProposal;
    onClose: () => void;
}

const DeleteProposalModule = ({ proposal, onClose }: IProps) => {
    const { title, id } = proposal;

    const removeProfileProposal = useDispatch<IProposalRemove>(removeProfileProposalAsync);

    const handleDelete = () => {
        removeProfileProposal({ id, name: title });
        onClose();
    };

    return (
        <>
            Czy napewno chcesz usunąć partnerstwo "{title}"
            <Flex justifyContent={{ base: 'center', md: 'space-between' }} pt={3}>
                <Button onClick={onClose} flexGrow={{ base: 1, md: 0 }} mr={4}>
                    Zamknij
                </Button>
                <Button onClick={handleDelete} colorScheme="orange" flexGrow={{ base: 1, md: 0 }} ml={4}>
                    Usuń
                </Button>
            </Flex>
        </>
    );
};

export default DeleteProposalModule;
