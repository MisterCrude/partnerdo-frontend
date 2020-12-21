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
        icon: SportIcon,
    },
    {
        name: 'Muzyka',
        icon: MusicIcon,
    },
    {
        name: 'Nauka',
        icon: LearningIcon,
    },
    {
        name: 'Dzieci',
        icon: ChildrenIcon,
    },
    {
        name: 'Podróże',
        icon: TravelIcon,
    },
    {
        name: 'Gry',
        icon: GameIcon,
    },
    {
        name: 'Rozrywka',
        icon: EventIcon,
    },
    {
        name: 'Biznes',
        icon: BusinessIcon,
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
    REMIND_PASSWORD_NEW: '/remind-password/new',
    CONVERSATIONS: '/conversations',
    PROPOSAL: '/proposal',
    PROPOSAL_CREATE: '/proposal/add',
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
