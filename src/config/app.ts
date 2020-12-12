import { IProposalCategory } from '@models/proposal';

import {
    BusinessIcon,
    MusicIcon,
    TravelIcon,
    LearningIcon,
    SportIcon,
    EventIcon,
    GameIcon,
    ChildrenIcon,
} from '@theme/customIcons';

export const BRAND_NAME = 'PartnerDo';

export const CATEGORIES_DATA: IProposalCategory[] = [
    // https://www.flaticon.com/search/2?word=music
    // https://www.flaticon.com/packs/retail-10?k=1607802870403
    {
        name: 'Sport',
        iconUrl: SportIcon,
        bgColor: 'green.500',
    },
    {
        name: 'Muzyka',
        iconUrl: MusicIcon,
        bgColor: 'pink.500',
    },
    {
        name: 'Nauka',
        iconUrl: LearningIcon,
        bgColor: 'yellow.500',
    },
    {
        name: 'Dzieci',
        iconUrl: ChildrenIcon,
        bgColor: 'cyan.500',
    },
    {
        name: 'Podróże',
        iconUrl: TravelIcon,
        bgColor: 'yellow.600',
    },
    {
        name: 'Gry',
        iconUrl: GameIcon,
        bgColor: 'purple.500',
    },
    {
        name: 'Rozrywka',
        iconUrl: EventIcon,
        bgColor: 'teal.500',
    },
    {
        name: 'Biznes',
        iconUrl: BusinessIcon,
        bgColor: 'red.400',
    },
];

export const TOAST_DURATION = 5000;

export const ROUTES = {
    BROWSER: '/',
    HOME: '/home',
    NOT_FOUND: '/404',
    FAQ: '/faq',
    LOGIN: '/login',
    REGISTER: '/register',
    REMIND_PASSWORD: '/remind-password',
    CONVERSATIONS: '/conversations',
    PROPOSAL: '/proposal',
    USER: '/user',
    PROFILE: '/profile',
};

export const CITIES = [
    'Warszawa',
    'Kraków',
    'Łódź',
    'Wrocław',
    'Poznań',
    'Gdańsk',
    'Szczecin',
    'Bydgoszcz',
    'Lublin',
    'Białystok',
    'Katowice',
    'Gdynia',
];

export const AGE_GROUPS: Record<string, string> = {
    young: '18 - 25',
    semimiddle: '26 - 35',
    middle: '36 - 45',
    semisenior: '45 - 55',
    senior: '> 55',
};

export const GENDER: Record<string, string> = {
    male: 'Mężczyzna ',
    female: 'Kobieta',
};
