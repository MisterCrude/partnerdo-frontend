import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT } from '@consts/app';
import { getUserName } from '@utils/user';
import { IProposal } from '@typing/proposal';
import { toLocaleDateString } from '@utils/convert';
import { truncateStringByWords } from '@utils/misc';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

interface IProps {
    results: IProposal[];
    onAuthorNameClick: (authorId: string) => void;
    onTitleClick: (proposalId: string) => void;
}

// eslint-disable-next-line
const Results = ({ results, onAuthorNameClick, onTitleClick }: IProps) => {
    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
            {results.map(({ id, author, city, cityArea, created, description, category, title }) => (
                <Card
                    key={id}
                    // TODO save cityName and cityArea in store after initialFetch and get it by id
                    address={`${city.name}, ${cityArea.name}`}
                    content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                    categoryName={category.name}
                    categoryColor={category.color}
                    publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                    title={title}
                    userAvatarUrl={author.avatar}
                    userName={getUserName(author.firstName, author.lastName, author.username)}
                    shortUserDesc={truncateStringByWords(author.description, SHORT_DESC_WORDS_AMOUT)}
                    onUserNameClick={() => onAuthorNameClick(author.id)}
                    onTitleClick={() => onTitleClick(id)}
                />
            ))}
        </VStack>
    );
};

export default Results;
