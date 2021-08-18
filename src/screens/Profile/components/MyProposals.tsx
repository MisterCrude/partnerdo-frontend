import { useState } from 'react';
import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT } from '@consts/app';
import { getUserName } from '@utils/user';
import { IProposal } from '@typing/proposal';
import { RequestStatus } from '@typing/api';
import { toLocaleDateString } from '@utils/convert';
import { truncateStringByWords } from '@utils/misc';

import Card, { Type } from '@components/Card';
import { VStack } from '@chakra-ui/react';
import DeleteProposalModule from '../modules/DeleteProposalModule';
import EditProposalModule from '../modules/EditProposalModule';
import { EditIcon, DeleteIcon } from '@theme/customIcons';
import { MenuItem, useDisclosure, UseDisclosureProps } from '@chakra-ui/react';
import ModalFrame from '@components/ModalFrame';

interface IProps {
    proposals: IProposal[];
    requestStatus: RequestStatus;
    onProposalClick: (proposalId: string) => void;
}

const MyProposals = ({ requestStatus, proposals, onProposalClick }: IProps) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose }: UseDisclosureProps = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose }: UseDisclosureProps = useDisclosure();

    const [choosenProposal, setChoosenProposal] = useState<IProposal>({} as IProposal);

    const showContent = requestStatus === RequestStatus.SUCCESS;
    const showError = requestStatus === RequestStatus.ERROR;
    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;

    const handleOpenEditModal = (proposal: IProposal) => {
        setChoosenProposal(proposal);
        onEditOpen();
    };

    const handleOpenDeleteModal = (proposal: IProposal) => {
        setChoosenProposal(proposal);
        onDeleteOpen();
    };

    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <>
                    {proposals.length ? (
                        <>
                            {proposals.map((proposal) => {
                                const { id, author, city, cityArea, created, description, category, title } = proposal;

                                return (
                                    <Card
                                        key={id}
                                        editActionButton={
                                            <MenuItem onClick={() => handleOpenEditModal(proposal)}>
                                                <EditIcon mr={2} /> Edytuj
                                            </MenuItem>
                                        }
                                        deleteActionButton={
                                            <MenuItem color="red.500" onClick={() => handleOpenDeleteModal(proposal)}>
                                                <DeleteIcon mr={2} /> Usuń
                                            </MenuItem>
                                        }
                                        // TODO save cityName and cityArea in store after initialFetch and get it by id
                                        address={`${city.name}, ${cityArea.name}`}
                                        categoryName={category.name}
                                        categoryColor={category.color}
                                        content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                                        publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                                        shortUserDesc={truncateStringByWords(
                                            author.description,
                                            SHORT_DESC_WORDS_AMOUT
                                        )}
                                        title={title}
                                        type={Type.EDITABLE}
                                        userAvatarUrl={author.avatar}
                                        userName={getUserName(author.firstName, author.lastName, author.username)}
                                        onTitleClick={() => onProposalClick(id)}
                                    />
                                );
                            })}

                            <ModalFrame
                                isOpen={isEditOpen}
                                modalTitle="Edycja partnerstwa"
                                size="4xl"
                                onClose={onEditClose}
                            >
                                <EditProposalModule proposal={choosenProposal} onClose={onEditClose} />
                            </ModalFrame>

                            <ModalFrame
                                isOpen={isDeleteOpen}
                                modalTitle="Usuwanie partnerstwa"
                                size="lg"
                                onClose={onDeleteClose}
                            >
                                <DeleteProposalModule proposal={choosenProposal} onClose={onDeleteClose} />
                            </ModalFrame>
                        </>
                    ) : (
                        <>Nie masz partnerstw</>
                    )}
                </>
            )}
        </VStack>
    );
};

export default MyProposals;
