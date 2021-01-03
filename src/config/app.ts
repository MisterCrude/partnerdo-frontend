import { IProposalCategory } from '@models/proposal';

import {
    BusinessColoredIcon,
    BusinessIcon,
    MusicColoredIcon,
    MusicIcon,
    TravelColoredIcon,
    TravelIcon,
    LearningColoredIcon,
    LearningIcon,
    SportColoredIcon,
    SportIcon,
    EventColoredIcon,
    EventIcon,
    GameColoredIcon,
    GameIcon,
    ChildrenColoredIcon,
    ChildrenIcon,
} from '@theme/customIcons';

export const BRAND_NAME = 'PartnerDo';

export const CATEGORIES_DATA: IProposalCategory[] = [
    // https://www.flaticon.com/free-icon/guitar_2892205?term=guitar&page=1&position=13&related_item_id=2892205
    // https://www.flaticon.com/packs/retail-10?k=1607802870403
    {
        name: 'Sport',
        iconColored: SportColoredIcon,
        iconStroked: SportIcon,
    },
    {
        name: 'Muzyka',
        iconColored: MusicColoredIcon,
        iconStroked: MusicIcon,
    },
    {
        name: 'Nauka',
        iconColored: LearningColoredIcon,
        iconStroked: LearningIcon,
    },
    {
        name: 'Dzieci',
        iconColored: ChildrenColoredIcon,
        iconStroked: ChildrenIcon,
    },
    {
        name: 'Podróże',
        iconColored: TravelColoredIcon,
        iconStroked: TravelIcon,
    },
    {
        name: 'Gry',
        iconColored: GameColoredIcon,
        iconStroked: GameIcon,
    },
    {
        name: 'Rozrywka',
        iconColored: EventColoredIcon,
        iconStroked: EventIcon,
    },
    {
        name: 'Biznes',
        iconColored: BusinessColoredIcon,
        iconStroked: BusinessIcon,
    },
];

export const TOAST_DURATION = 5000;

export const ROUTES = {
    ROOT: '/',
    NOT_FOUND: '/404',
    FAQ: '/faq',
    LOGIN: '/login',
    REGISTER: '/register',
    REMIND_PASSWORD: '/remind-password',
    REMIND_PASSWORD_NEW: '/remind-password/new',
    CONVERSATIONS: '/conversations',
    PROPOSALS: '/proposals',
    PROPOSALS_CREATE: '/proposals/add',
    USER_PROFILE: '/user',
    PROFILE: '/profile',
    PROFILE_MY_PROPOSALS: '/profile/my-proposals',
    PROFILE_DONE_PROPOSALS: '/profile/done-proposals',
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
