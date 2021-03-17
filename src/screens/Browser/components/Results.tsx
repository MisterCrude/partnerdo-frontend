import React from 'react';
import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT } from '@consts/app';
import { getUserName } from '@utils/user';
import { IProposal } from '@models/proposal';
import { truncateStringByWords } from '@utils/misc';
import { toLocaleDateString } from '@utils/convert';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

interface IProps {
    isFetching: boolean;
    results: IProposal[];
    onAuthorNameClick: (authorId: string) => void;
    onTitleClick: () => void;
}

// eslint-disable-next-line
const Results: React.FC<IProps> = ({ isFetching, results, onAuthorNameClick, onTitleClick }) => (
    <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
        {isFetching ? (
            <>Skeleton</>
        ) : (
            <>
                {results.map(({ id, author, city, cityArea, created, description, category, title }) => (
                    <Card
                        key={id}
                        // TODO save cityName and cityArea in store after initialFetch and get it by id
                        address={`${city.name}, ${cityArea.name}`}
                        content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                        category={category.name}
                        publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                        title={title}
                        userAvatarUrl={author.avatar || ''}
                        userName={getUserName(author)}
                        shortUserDesc={truncateStringByWords(author.description, SHORT_DESC_WORDS_AMOUT)}
                        onUserNameClick={() => onAuthorNameClick(author.id)}
                        onTitleClick={onTitleClick}
                    />
                ))}
            </>
        )}
    </VStack>
);

export default Results;
