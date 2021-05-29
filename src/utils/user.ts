import { capitalize } from 'lodash/fp';

export const getUserName = (firstName: string, lastName: string, username: string) =>
    firstName ? `${firstName} ${lastName}` : capitalize(username);
