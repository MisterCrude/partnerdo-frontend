import React from 'react';
import { capitalize } from 'lodash/fp';
import { IProposal, IAuthor } from '@models/proposal';
import { ROUTES } from '@consts/routes';
import { DEFAULT_LOCALE } from '@consts/app';
import { truncateStringByWords, toLocaleDateString } from '@utils/misc';
import { useHistory } from 'react-router-dom';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

const SHORT_CONTENT_WORDS_AMOUNT = 25;
const SHORT_DESC_WORDS_AMOUT = 10;

interface IProps {
    isFetching: boolean;
    results: IProposal[];
}

// eslint-disable-next-line
const Results: React.FC<IProps> = ({ isFetching, results }) => {
    const history = useHistory();

    // TODO remove from here
    const handleUserNameClick = () => history.push(`${ROUTES.USER_PROFILE}/some-user-id`);
    const handleTitleClick = () => history.push(`${ROUTES.PROPOSALS}/some-proposal-id`);

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
                            // TODO get it from store
                            address={`${city.name}, ${cityArea.name}`}
                            content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                            category={category.name}
                            publishDate={toLocaleDateString(updated, DEFAULT_LOCALE)}
                            title={title}
                            userAvatarUrl={author.avatar || ''}
                            userName={renderUserName(author)}
                            shortUserDesc={truncateStringByWords(author.description, SHORT_DESC_WORDS_AMOUT)}
                            onUserNameClick={handleUserNameClick}
                            onTitleClick={handleTitleClick}
                        />
                    ))}
                </>
            )}
        </VStack>
    );
};

export default Results;
