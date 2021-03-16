import { capitalize } from 'lodash/fp';
import { IAuthor } from '@models/proposal';

export const getUserName = ({ firstName, lastName, username }: IAuthor) =>
    firstName ? `${firstName} ${lastName}` : capitalize(username);
