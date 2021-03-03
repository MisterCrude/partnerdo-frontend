import React from 'react';
import { capitalize } from 'lodash/fp';
import { IProposal, IAuthor } from '@models/proposal';
import { DEFAULT_LOCALE } from '@consts/app';
import { truncateStringByWords, toLocaleDateString } from '@utils/misc';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

const SHORT_CONTENT_WORDS_AMOUNT = 25;
const SHORT_DESC_WORDS_AMOUT = 10;

interface IProps {
    isFetching: boolean;
    results: IProposal[];
    onAuthorNameClick: () => void;
    onTitleClick: () => void;
}

// eslint-disable-next-line
const Results: React.FC<IProps> = ({ isFetching, results, onAuthorNameClick, onTitleClick }) => {
    const renderUserName = ({ firstName, lastName, username }: IAuthor) =>
        firstName ? `${firstName} ${lastName}` : capitalize(username);

    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
            {isFetching ? (
                <>Skeleton</>
            ) : (
                <>
                    {results.map(({ id, author, city, cityArea, description, category, updated, title }: IProposal) => (
                        <Card
                            key={id}
                            // TODO save cityName and cityArea in store after initialFetch and get it by id
                            address={`${city.name}, ${cityArea.name}`}
                            content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                            category={category.name}
                            publishDate={toLocaleDateString(updated, DEFAULT_LOCALE)}
                            title={title}
                            userAvatarUrl={author.avatar || ''}
                            userName={renderUserName(author)}
                            shortUserDesc={truncateStringByWords(author.description, SHORT_DESC_WORDS_AMOUT)}
                            onUserNameClick={onAuthorNameClick}
                            onTitleClick={onTitleClick}
                        />
                    ))}
                </>
            )}
        </VStack>
    );
};

export default Results;
