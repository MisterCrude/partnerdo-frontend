import React from 'react';
import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT } from '@consts/app';
import { getUserName } from '@utils/user';
import { IProposal } from '@models/proposal';
import { IProposalRemove } from '@slices/profileSlice';
import { RequestStatus } from '@models/misc';
import { toLocaleDateString } from '@utils/convert';
import { truncateStringByWords } from '@utils/misc';

import Card, { Types } from '@components/Card';
import { VStack } from '@chakra-ui/react';

interface IProps {
    proposals: IProposal[];
    requestStatus: RequestStatus;
    onProposalClick: (proposalId: string) => void;
    onRemove: (proposalRemove: IProposalRemove) => void;
}

const MyProposals: React.FC<IProps> = ({ requestStatus, proposals, onProposalClick, onRemove }) => {
    const showContet = requestStatus === RequestStatus.SUCCESS;
    const showError = requestStatus === RequestStatus.ERROR;
    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;

    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContet && (
                <>
                    {proposals.length ? (
                        <>
                            {proposals.map(({ id, author, city, cityArea, created, description, category, title }) => (
                                <Card
                                    key={id}
                                    // TODO save cityName and cityArea in store after initialFetch and get it by id
                                    address={`${city.name}, ${cityArea.name}`}
                                    category={category.name}
                                    content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                                    publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                                    shortUserDesc={truncateStringByWords(author.description, SHORT_DESC_WORDS_AMOUT)}
                                    title={title}
                                    type={Types.EDITABLE}
                                    userAvatarUrl={author.avatar}
                                    userName={getUserName(author)}
                                    onTitleClick={() => onProposalClick(id)}
                                    onRemove={() => onRemove({ id, name: title })}
                                />
                            ))}
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
